import * as S from "./BoardList.styles";
import UnevenSetsFinite from "../boardList/carousel/BoardListCarousel";
import { v4 as uuidv4 } from "uuid";
import BackTopAnt from "../../../commons/backTop";
import InfiniteScroll from "react-infinite-scroller";

export default function BoardListPresenter(props: any) {
  return (
    <S.Wrapper>
      <S.SubHeaderWrapper isSubHeaderOnTop={props.isSubHeaderOnTop}>
        <S.SubHeader ref={props.subHeader}>
          <S.ViewTypeWrapper>
            <S.ViewTotal
              onClick={props.onClickViewAccompanyDate}
              selectAccompanyDate={props.selectAccompanyDate}
            >
              날짜로 보기
            </S.ViewTotal>
            <S.ViewLatest
              onClick={props.onClickViewLatest}
              selectLatest={props.selectLatest}
            >
              최신글 보기
            </S.ViewLatest>
            <S.ViewAccompany
              onClick={props.onClickViewRequested}
              selectRequested={props.selectRequested}
            >
              신청리스트
            </S.ViewAccompany>
          </S.ViewTypeWrapper>
          <S.SearchAndCreateWrapper>
            <S.ViewAsSearch>
              <S.EventSearchWrapper>
                <S.MySearchIcon />
                <S.EventSearchInput placeholder="행사이름으로 검색해보세요!" />
              </S.EventSearchWrapper>
            </S.ViewAsSearch>
            <S.CreateBoard onClick={props.onClickCreateBoard}>
              글쓰기
            </S.CreateBoard>
          </S.SearchAndCreateWrapper>
        </S.SubHeader>
      </S.SubHeaderWrapper>
      <S.Main>
        <S.DetailViewTypeWrapper>
          <S.EventAndDateTypeWrapper>
            <S.EventTypeWrapper>
              <S.DetailViewTypeTitle>카테고리</S.DetailViewTypeTitle>
              <S.CarouselWrapper>
                <UnevenSetsFinite
                  eventCategory={props.eventCategory}
                  viewTypeData={props.viewTypeData}
                  setCategoryData={props.setCategoryData}
                />
              </S.CarouselWrapper>
            </S.EventTypeWrapper>
            {props.isUseDateChanger && (
              <>
                <S.SeparateLine />
                <S.DateWrapper>
                  <S.DetailViewTypeTitle>날짜선택</S.DetailViewTypeTitle>
                  <S.DateChangerWrapper>
                    <S.ArrowButton onClick={props.onClickArrowLeft}>
                      {!props.isWeekly ? (
                        <S.ArrowLeft src="/icon/double_arrow_left.png" />
                      ) : (
                        <S.ArrowLeft src="/icon/arrow_left.png" />
                      )}
                    </S.ArrowButton>
                    <S.DateView>
                      <S.DateStart>
                        {props.fromToDate.from
                          .replace("-", "년 ")
                          .replace("-", "월 ") + "일"}
                      </S.DateStart>
                      ~
                      <S.DateEnd>
                        {props.fromToDate.to
                          .replace("-", "년 ")
                          .replace("-", "월 ") + "일"}
                      </S.DateEnd>
                    </S.DateView>
                    <S.ArrowButton onClick={props.onClickArrowRight}>
                      {!props.isWeekly ? (
                        <S.ArrowRight src="/icon/double_arrow_right.png" />
                      ) : (
                        <S.ArrowRight src="/icon/arrow_right.png" />
                      )}
                    </S.ArrowButton>
                  </S.DateChangerWrapper>
                  {!props.isWeekly ? (
                    <S.WeeklyViewButton onClick={props.onClickWeeklyMonthly}>
                      주별 이동
                    </S.WeeklyViewButton>
                  ) : (
                    <S.MonthlyViewButton onClick={props.onClickWeeklyMonthly}>
                      월별 이동
                    </S.MonthlyViewButton>
                  )}
                </S.DateWrapper>
              </>
            )}
          </S.EventAndDateTypeWrapper>
          <S.RecruitmentViewTypeButton
            onClick={props.onClickViewRecruit}
            selectViewRecruit={props.selectViewRecruit}
          >
            모집중인 글만 보기
          </S.RecruitmentViewTypeButton>
        </S.DetailViewTypeWrapper>
        {/* <InfiniteScroll pageStart={0} loadMore={props.loadFunc} hasMore={true}> */}
        <S.ListWrapper>
          {props.data.map((el: any) => (
            <S.Item
              key={uuidv4()}
              onClick={props.onClickGoDetail(el.eventName)}
            >
              <S.ItemLeft>
                <S.EventImage src="/market.jpg" />
                <S.ItemMain>
                  <S.Header>
                    <S.Recruitment recruited={el.recruited}>
                      {el.recruited ? "[모집완료]" : "[모집중]"}
                    </S.Recruitment>
                    <S.Title>{el.title}</S.Title>
                  </S.Header>
                  <S.Remark>{el.remark}</S.Remark>
                  <S.Footer>
                    <S.Event>
                      <S.EventIcon />
                      {el.eventName}
                    </S.Event>
                    <S.Category>
                      <S.CategoryIcon />
                      {el.category}
                    </S.Category>
                    <S.MaxHeadCount>
                      <S.MaxHeadCountIcon />
                      {el.maxHeadCount}명
                    </S.MaxHeadCount>
                    <S.AccompanyDate>
                      <S.CalendarIcon />
                      {el.accompanyDate.start} ~ {el.accompanyDate.end}
                    </S.AccompanyDate>
                  </S.Footer>
                </S.ItemMain>
              </S.ItemLeft>
              <S.ItemRight requested={el.requested}>
                {el.requested ? (
                  <S.PaperPlaneImage src="/icon/symbollogo_removebg.png" />
                ) : (
                  <S.PaperPlaneImage src="/icon/simbollogo.png" />
                )}
              </S.ItemRight>
            </S.Item>
          ))}
        </S.ListWrapper>
        {/* </InfiniteScroll> */}
        <BackTopAnt />
      </S.Main>
    </S.Wrapper>
  );
}
