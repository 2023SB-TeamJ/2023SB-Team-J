import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function PageShiftBtn({ path }) {
  const navigate = useNavigate();

  return (
    <PageContainer
      onClick={() => {
        navigate(path);
      }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 77 77" fill="none">
        <g filter="url(#filter0_d_606_413)">
          <circle cx="38.5" cy="34.5" r="33" stroke="#151515" strokeWidth="3" />
          <path d="M31 20L46 34.5L31 49" stroke="#151515" strokeWidth="3" />
        </g>
        <defs>
          <filter
            id="filter0_d_606_413"
            x="0"
            y="0"
            width="77"
            height="77"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="4" />
            <feGaussianBlur stdDeviation="2" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_606_413"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_606_413"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
    </PageContainer>
  );
}

export default PageShiftBtn;

const PageContainer = styled.div`
  width: 69px;
  height: 69px;
  flex-shrink: 0;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  cursor: pointer;
`;
