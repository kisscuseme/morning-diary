import {
  and,
  collection,
  doc,
  DocumentData,
  DocumentSnapshot,
  getDoc,
  getDocs,
  limit,
  orderBy,
  OrderByDirection,
  query,
  QueryDocumentSnapshot,
  runTransaction,
  startAfter,
  where,
  WithFieldValue,
  writeBatch,
} from "firebase/firestore";
import { firebaseDb } from "./firebase";
import { WhereConfigType } from "@/types/types";

// 한 번에 조회할 데이터 개수 제한
const limitNumber = 15;

// DB 루트 PATH
const language: string = "KR";
const dbRootPath: string = "languages/" + language;

// 데이터가 위치한 db path 생성
const getFullPath = (uid: string) => {
  return dbRootPath + "/users/" + uid + "/diary";
};

// user db path 생성
const getUserPath = () => {
  return dbRootPath + "/users";
};


// firestore의 where 조건 생성
const makeRangeQuery = (whereConfig: WhereConfigType[]) => {
  const conditions = [];
  for (const condition of whereConfig) {
    conditions.push(
      where(condition.field, condition.operator, condition.value)
    );
  }
  return and(...conditions);
};

// 추가 데이터 조회 시 기준 점 오브젝트 조회 (서버와 클라이언트 데이터가 구조가 달라서 별도 조회 함)
const getLastVisible = async (uid: string, docId: string) => {
  return await getDoc(doc(firebaseDb, getFullPath(uid), docId));
};

// 클라이언트에서 firestore 데이터를 조회
const queryData = async (
  whereConfig: WhereConfigType[],
  path: string,
  lastVisible:
    | QueryDocumentSnapshot<DocumentData>
    | DocumentSnapshot<DocumentData>
    | string
    | null,
  orderByField: string,
  orderByDirection: OrderByDirection
) => {
  const currentQuery =
    lastVisible !== null
      ? query(
          collection(firebaseDb, path),
          makeRangeQuery(whereConfig),
          orderBy(orderByField, orderByDirection),
          startAfter(lastVisible),
          limit(limitNumber)
        )
      : query(
          collection(firebaseDb, path),
          makeRangeQuery(whereConfig),
          orderBy(orderByField, orderByDirection),
          limit(limitNumber)
        );
  const documentSnapshots = await getDocs(currentQuery);
  const dataList: DocumentData[] = [];
  documentSnapshots.forEach((doc) => {
    dataList.push(doc.data());
  });

  // 조회 개수 제한 값보다 조회된 데이터가 적으면 더 이상 조회할 데이터가 없다고 판단 함
  const nextLastVisible =
  dataList.length < limitNumber
      ? null
      : documentSnapshots.docs[documentSnapshots.docs.length - 1];
  return {
    lastVisible: nextLastVisible,
    dataList: dataList,
  };
};

// firebase 데이터 수정
const updateData = async (
  path: string,
  docId: string,
  updateData: WithFieldValue<DocumentData>
) => {
  try {
    await runTransaction(firebaseDb, async (transaction) => {
      const dataDocRef = doc(firebaseDb, path, docId);
      const dataDoc = await transaction.get(dataDocRef);
      if (!dataDoc.exists()) {
        throw "Document does not exist!";
      }
      const updatedata = {
        ...dataDoc.data(),
        ...updateData,
      };
      transaction.update(dataDocRef, updatedata);
    });
    // console.log("Transaction successfully committed!");
  } catch (e) {
    console.log("Transaction failed: ", e);
  }
};

// firebase 데이터 추가
const insertData = async (
  path: string,
  insertData: WithFieldValue<DocumentData>
) => {
  // Get a new write batch
  const batch = writeBatch(firebaseDb);

  const docRef = doc(collection(firebaseDb, path));
  const dataRef = doc(firebaseDb, path, docRef.id);
  batch.set(dataRef, insertData);

  // Commit the batch
  await batch.commit();

  return docRef.id;
};

// firebase 데이터 삭제
const deleteData = async (
  path: string,
  docId: string
) => {
  // Get a new write batch
  const batch = writeBatch(firebaseDb);

  const scheduleRef = doc(firebaseDb, path, docId);
  batch.delete(scheduleRef);

  // Commit the batch
  await batch.commit();
};

// firebase 삭제 계정 표시
const markDeletedAccount = async (deletedUserInfo: {
  uid: string;
}) => {
  try {
    const userPath = getUserPath();
  
    // Get a new write batch
    const batch = writeBatch(firebaseDb);
  
    const userRef = doc(firebaseDb, userPath, deletedUserInfo.uid);
    batch.set(userRef, {status: "deleted"});
  
    // Commit the batch
    await batch.commit();
  
    return true;
  } catch(error: any) {
    console.log(error);
    return false;
  }
};

export {
  queryData,
  getFullPath,
  updateData,
  insertData,
  deleteData,
  limitNumber,
  getLastVisible,
  markDeletedAccount
};
