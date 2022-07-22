import * as S from "./ProductWrite.Styles";
import { IProductWriteUIProps } from "./ProductWrite.Types";
import ButtonSubmit from "../../../commons/buttons/submit";
import CommonInput from "../../../commons/inputs/infoInputs";
import { useMoveToPage } from "../../../commons/hooks/useMoveToPage";
import ImageUploading from "react-images-uploading";
import { UploadOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { Clear, Edit } from "@mui/icons-material";

export default function ProductWriteUI(props: IProductWriteUIProps) {
  const { onClickMoveToPage } = useMoveToPage();
  return (
    <S.Wrapper>
      <S.WriteTitle>{props.isEdit ? "상품 수정" : "상품 등록"}</S.WriteTitle>
      <S.WriteForm
        onSubmit={
          props.isEdit
            ? props.handleSubmit(props.onClickUpdateProduct)
            : props.handleSubmit(props.onClickCreateProduct)
        }
      >
        {/* 이름, 가격, 요약 입력 */}
        <S.InputWrapper>
          <S.Label>상품 이름 *</S.Label>
          <CommonInput
            register={props.register("name")}
            placeholder="상품의 특성이 잘 드러나도록 입력해주세요."
          />
          <S.Error>{props.formState.errors.name?.message}</S.Error>
        </S.InputWrapper>
        <S.InputWrapper>
          <S.Label>상품 가격 *</S.Label>
          <CommonInput
            register={props.register("price")}
            type="number"
            placeholder="가격을 입력해주세요."
          />
          <S.Error>{props.formState.errors.price?.message}</S.Error>
        </S.InputWrapper>
        <S.InputWrapper>
          <S.Label>상품 요약 *</S.Label>
          <CommonInput
            register={props.register("summary")}
            placeholder="상품에 대해 간단하게 요약해주세요."
          />
          <S.Error>{props.formState.errors.summary?.message}</S.Error>
        </S.InputWrapper>

        {/* 이미지 업로드 */}
        <S.InputWrapper>
          <S.Label>상품 이미지</S.Label>
          <ImageUploading
            multiple
            value={props.imageList}
            onChange={props.onChangeFiles}
            maxNumber={1000}
            dataURLKey="data_url"
          >
            {({
              imageList,
              onImageUpload,
              onImageRemoveAll,
              onImageUpdate,
              onImageRemove,
              isDragging,
              dragProps,
            }) => (
              // write your building UI
              <div className="upload__image-wrapper">
                <Button
                  type="button"
                  style={isDragging ? { color: "red" } : undefined}
                  onClick={onImageUpload}
                  {...dragProps}
                >
                  <UploadOutlined />
                  Click or Drop here
                </Button>
                <S.ImageWrapper>
                  {imageList.map((image, index) => (
                    <div key={index} className="image-item">
                      <img src={image.data_url} alt="" width="100" />
                      <div className="image-item__btn-wrapper">
                        <S.UploadBtn
                          type="button"
                          onClick={() => onImageUpdate(index)}
                        >
                          <Edit />
                        </S.UploadBtn>
                        <S.UploadBtn
                          type="button"
                          onClick={() => onImageRemove(index)}
                        >
                          <Clear />
                        </S.UploadBtn>
                      </div>
                    </div>
                  ))}
                </S.ImageWrapper>
              </div>
            )}
          </ImageUploading>
        </S.InputWrapper>

        {/* 웹에디터 UI */}
        <S.EditorWrapper>
          <S.Label>상세 내용 *</S.Label>
          <S.MyReactQuill
            onChange={props.onChangeContents}
            defaultValue={props.data?.fetchProduct.contentSrc}
            placeholder="상품에 대한 설명을 입력해주세요."
          />
          <S.Error>{props.formState.errors.contents?.message}</S.Error>
        </S.EditorWrapper>

        {/* 등록,취소 버튼 */}
        <S.BtnWrapper>
          <S.SubmitWrapper>
            <ButtonSubmit
              fontSize="1.25rem"
              isActive={props.formState.isValid}
              title={props.isEdit ? "수정" : "등록"}
            />
          </S.SubmitWrapper>
          <S.SubmitWrapper>
            <S.CancelBtn type="button" onClick={onClickMoveToPage(`/products`)}>
              취소
            </S.CancelBtn>
          </S.SubmitWrapper>
        </S.BtnWrapper>
      </S.WriteForm>
    </S.Wrapper>
  );
}
