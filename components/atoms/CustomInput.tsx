import React, {
  ChangeEvent,
  HTMLProps,
  RefObject,
  forwardRef,
  useEffect,
  useState,
} from "react";
import { FormControl, FormControlProps } from "react-bootstrap";
import { ThemeProvider, styled } from "styled-components";

interface InputOwnProps {
  /**
   * 타입
   */
  type?: string;
  /**
   * 클리어 버튼 보임 여부
   */
  clearButton?: boolean;
  /**
   * clear button ref
   */
  clearBtnRef?: RefObject<HTMLButtonElement>;
  /**
   * onClearButtonClick
   */
  onClearButtonClick?: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  /**
   * initValue
   */
  initValue?: string;
  /**
   * backgroundColor
   */
  backgroundColor?: string;
  /**
   * placeholderColor
   */
  placeholderColor?: string;
}

type InputProps = InputOwnProps &
  FormControlProps &
  HTMLProps<HTMLInputElement>;

// 삭제 버튼 스타일 정의
const ClearButton = styled.button`
  position: absolute;
  font-weight: 700;
  border: none;
  color: #9e9e9e;
  background-color: transparent;
  @media (hover: hover) and (pointer: fine) {
    &:hover {
      color: #6e6e6e;
    }
  }
`;

// 기본 Input 스타일 오버라이딩
const CustomFormControl = styled(FormControl)`
  display: inline-block;
  border: 0;
  outline-width: 0;
  color: ${(props) => props.theme.color};
  background-color: transparent;
  width: 100%;
  padding: 0;
  border-radius: 0;
  &:focus {
    box-shadow: unset;
    background-color: transparent;
  }
  &::placeholder {
    color: ${(props) => props.theme.placeholderColor};
  }
`;

/**
 * 기본 인풋 컴포넌트
 * forwardRef 옵트인기능 활용
 * 참고: https://ko.legacy.reactjs.org/docs/forwarding-refs.html
 */
export const CustomInput = forwardRef(
  (
    {
      type = "text",
      placeholder = "",
      clearButton,
      clearBtnRef,
      initValue = "",
      onClearButtonClick,
      onChange,
      as,
      backgroundColor = "transparent",
      color = "#000000",
      placeholderColor = "#afafaf",
      ...props
    }: InputProps,
    ref: React.ForwardedRef<HTMLInputElement>
  ) => {
    const [text, setText] = useState("");

    useEffect(() => {
      if (initValue !== "") {
        setText(initValue);
      }
    }, [initValue]);

    const wrapperStyle =
      as === "textarea"
        ? {
            padding: "5px",
            borderRadius: "5px",
            backgroundColor: backgroundColor,
          }
        : {
            borderBottom: "1px solid #000000",
            paddingRight: `${clearButton ? "25px" : "0"}`,
            backgroundColor: backgroundColor,
          };

    const theme = {
      color: color,
      placeholderColor: placeholderColor,
    };

    return (
      <div style={wrapperStyle}>
        <ThemeProvider theme={theme}>
          <CustomFormControl
            ref={ref}
            type={type}
            placeholder={placeholder}
            value={text}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setText(e.currentTarget.value);
              if (onChange) onChange(e);
            }}
            as={as}
            {...props}
          />
          {clearButton && type !== "date" && text !== "" && (
            <ClearButton
              type="button"
              tabIndex={-1}
              ref={clearBtnRef}
              onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                setText("");
                if (onClearButtonClick) onClearButtonClick(e);
              }}
            >
              X
            </ClearButton>
          )}
        </ThemeProvider>
      </div>
    );
  }
);
CustomInput.displayName = "CustomInput";
