import React, { useState } from 'react';
import Masonry from 'react-masonry-css';
import styled from 'styled-components';
// import UploadBtn from '../components/UploadBtn';
import AlbumDetailModal from '../components/AlbumDetailModal';

function AlbumPage() {
  const images = [
    'https://s3-alpha-sig.figma.com/img/bc16/dca6/87bcc750a17c8606010729684a71e24a?Expires=1690156800&Signature=Zg9jI3wu6OMplp1Gv6pxWzBA36c4U8lXHOtJw~hMjDgkkNiGu11UFDekP-zsQ70zY5eGbLzt00pRkS1IRu2rU-rKlhDz63oK6aIGMSThShqAI8zaKm3c6TzNOb2EtseD8AQBIVqkXbslw6xRrBkuBoV0GHbqavmUrBQhGnZRcoEtl~T9Y7lFbQfqedx78G7PY82qZ8ZSV3nIJrI4ZC4fPs~Ha0iPwPxvbn0XQ0W3qL7gcDidY4rGIYy85abedhI6JkF5vHjeYblNXZgHdzDRUmiVdW-8ORkVkg~zvGorzdTdbsjbyQph02VMLHbnNi4LLpWxvR10OB84TaJ-Nngawg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
    'https://s3-alpha-sig.figma.com/img/33b6/231f/4ef9af44b444ede0015278dbafbea50a?Expires=1690156800&Signature=LgDA0fZ99FMtk3ZHwtTT~rmd-BBTGyMF1rLwQ1dl0r2pegJgIcPCbld1be420GLNQ1vn80sOAjlkHvIMX3gbgqsLKoeIvlLGsKxz4mRpJjo~8HUqmMVlrZTWA59cxnQIH4o7uNGugvfUQlM6aBmYXD1yCiva5uaj~ftc~SitoVOw6m4O41NIvvt2PSjhQZ0WXlAHZRgx5i7MDZ165RC~DpeDx0dDRAoNqpniwytoC~X7U2Krpg~T089gjIzCG7uSITwAFkW598c4ln4RXwZcWUH2ArJhdyhJKE7QbNtXzVulDLCd60beYdhP071g54i85-uVOizFlbMTTQ-H2vah8g__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
    'https://s3-alpha-sig.figma.com/img/53b5/3ddb/3e00561f4de8273abb33a75ff75283d2?Expires=1690156800&Signature=d7YrszEigOm21NpsBQxATMhqeAcsoG0O1v8eUFV1VxW-2-GJD-bqjcKGqoWjCEKfqVr6zbYaAYiQwxBccFIYc~YmDuhpIRIw0GyXXKfYpNwZPYWf-~teKF6RAC50rxksYRM3drserPb3MewWn4JtLSTEukNMLDpmUCZYlPtlt2-jIedWFWZDWggVZFVcJ1bV0adnW6qvFILFYgnj97UZPasoODW3cpwzOYWTJRHH15kSGrvp79tYeenkJHNrItXKYnTuLPtzJ5Qz19ESTYeqxdBDk5kSDj83N~mueEIc18NQRbxUE5hu~2lC1llTUkrrJI0dEZBjlM1Kf040rTcsEA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
    'https://s3-alpha-sig.figma.com/img/13af/3b63/2d887eedf1cb8c4690f19c554470e97c?Expires=1690156800&Signature=L4BtfacYSDyiShDFbYOhvYVQdj0Sz-jTcJzZCy1TQzridMFbro9UaVlYZv0HtUDyYJTDjAIEYx2CpQgN3MZkkuDnJte2TUJ4tiKrLh5VqLj6IGV6oxPszXOtwfcoPyiE29ibg7nLibeXtXte69A~k230-gjppdPyE6KhVznyqEEeseAP7G5luiwKLy854hxAOtyVYDdDGc7VBE3cn535yO5aa~KIiqTeE4oo9ggvZNB1~0JEFCfTkdXrR3zeaCBPL-4h5cjdMyJnAaDmdmN~etlsYCD4hzhxqmBn4GxHCb1fl1FOO8fd2m9uEz~SW83dTNm4fNYTEF9~vKjXQs-E6g__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
    'https://s3-alpha-sig.figma.com/img/f490/ac1e/ce4114f2582d5f46beb802f9778efaad?Expires=1690156800&Signature=TfYvcMcu9LfUdrpoGuSdHghzE1lQU08QEigJafhSt4UEqMyMDVw7lntjrD4qi4QyTe8VSMZB9o-bPP38jkpFTkzmhPohocrWCUsj8pJSKAoFyc-WS3~FLOp30GiN8pGLxxCixOlYOxLcUmYaDLVto0i7DiHoADBd3w6V2LXjzMhz~6UPQv4jCBnlFtz9785-rxPkheXnCYCG9ieDP0NGjgaCA~XlU0QZ-vF-ai7ACQSw2hovuM~U4TUgTJ3ynyv~HROa~JQQ6ucKt7H~gp27Z8Xxg0w~v~Q7uRJz4GVnmEPcXYOkpNDhgsJCz~4LjmTGtI1~xS8K6UPHR0bumqFqyw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
    'https://s3-alpha-sig.figma.com/img/6411/c74d/62d13ab8020794b09756f187773e2956?Expires=1690156800&Signature=egD6DUwvLWjFWR9HegLJOcFKy2FAwYvISd5NUX~OoaWZsg-YL03rLwTyAW14qAgzifmMdvfx6IexsjolvNKT6g5TaFA1A~GeO0K4xYM64OyjBb48D3WnygGC6n~2By~75EcNq~l3JG84L9w8Uiwoj4MdlGXIMotMMPWbXLeJEattB7FwvfO3sFMtt4kmoCYUxai4C~EX4-Jqtr~~tOAlix7NnTM9YDvltIGnQkiIZuQJKyd93w5L~OeTfqiIjAxLaVIsAWytltFcNch9VYFil2W6-JgKKLjms3kd~6ccRPnUAbFj54a2ShqMbloL5YvRNS8rdI0MSSp3FR~g3U8cDg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
    'https://s3-alpha-sig.figma.com/img/96b8/1294/9370388aa14e755a90a10150f4ec7db9?Expires=1690156800&Signature=Ma~zci7IS17NGIASOGZ2tiVna6075kN7tjZ7wnF~0cwu98kUqfpPp7XSWN-AZsCiIN3hGngc4puWMPjBV4TPSEqjSkYLcOozC8kkkpZZogLnkPYKhluW72vbpvu7OdQNMyC677Sj1vnYFi8uoGiKKfRNpp1du9Qv6FSX4SCSg78c06Iv4TtOv0Wz6Ja6newc9IUkCsf2W8q5T9W0UERZpJ~du6IrxN0rK0~JiT0TpkapLzC3lZ2diHqrilXfD0IG2CdQqdvHQAx9QWAJLQljWWaRF61K7D1NkO4JAW7Z4U~RwlnGnumtFTl3QWYtaDd0nZA-aR7~LLulc7cXlVnmKg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
  ];

  const [isOpen, setIsOpen] = useState(false);

  const openModalHandler = () => {
    // isOpen의 상태를 변경하는 메소드를 구현
    // !false -> !true -> !false
    setIsOpen(true);
  };

  const breakpointColumnObj = {
    default: 4, // 기본 레이아웃에서 4열
    1200: 3, // 창 너비 1200px 이하일 때 3열
    900: 2, // 창 너비 900px 이하일 때 2열
    600: 1, // 창 너비 600px 이하일 때 1열
  };

  return (
    <div>
      <Container>
        <Navbar>상단바</Navbar>
        <MainWrap>
          <MyMasonryGrid
            breakpointCols={breakpointColumnObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {images.map((v, i) => {
              return (
                <MyMasonryGridColumn key={v}>
                  <ImageWithShadow
                    src={images[i]}
                    alt=""
                    onClick={openModalHandler}
                  />
                  {isOpen && <AlbumDetailModal setIsOpen={setIsOpen} />}
                </MyMasonryGridColumn>
              );
            })}
          </MyMasonryGrid>
          {/* <CenteredButton>
            <UploadBtn path="/upload" />
          </CenteredButton> */}
        </MainWrap>
      </Container>
    </div>
  );
}

export default AlbumPage;

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background: ${(props) => props.theme.backgroundColor};
`;

const MainWrap = styled.div`
  max-width: 1440px;
  height: 100vh;
  margin: 0 auto;
  flex-shrink: 0;
  border: 3px solid black;
  background-color: white;
`;

const Navbar = styled.div`
  height: 120px; /* 예시로 50px 높이 설정 */
  background-color: ${(props) => props.theme.navbarColor};
`;

const MyMasonryGrid = styled(Masonry)`
  display: flex;
  margin-left: -30px; /* 컬럼 간격을 조절하기 위해 음수 마진을 적용 */
  width: auto;

  &::after {
    content: '';
    display: block;
    clear: both;
  }
`;

const MyMasonryGridColumn = styled.div`
  padding-left: 30px; /* 컬럼 간격을 조절하기 위해 패딩을 적용 */
  background-clip: padding-box;

  img {
    width: 100%;
    display: block;
  }
`;

const ImageWithShadow = styled.img`
  box-shadow: 10px 10px 6px 0px rgba(0, 0, 0, 0.25);
`;

// const CenteredButton = styled.div`
//   position: absolute;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
// `;
