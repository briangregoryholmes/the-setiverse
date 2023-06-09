import { strokeWidth } from '@/utils/constants';

export default function Diamond({ fill }: { fill: string }) {
  return (
    <svg
      width="108"
      height="182"
      viewBox="0 0 108 182"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M45.2766 15.5653C49.0958 8.75059 58.9042 8.7506 62.7234 15.5653L102.26 86.1111C103.962 89.1481 103.962 92.8519 102.26 95.889L62.7234 166.435C58.9042 173.249 49.0958 173.249 45.2766 166.435L5.73996 95.8889C4.03786 92.8519 4.03786 89.1481 5.73996 86.111L45.2766 15.5653Z"
        strokeWidth="8"
        strokeLinejoin="round"
      />
      {fill === 'hatched' && (
        <>
          <line
            x1="99.4366"
            y1="83.2437"
            x2="51.4366"
            y2="169.244"
            strokeWidth={strokeWidth}
          />
          <line
            x1="95.4366"
            y1="79.2437"
            x2="47.4366"
            y2="165.244"
            strokeWidth={strokeWidth}
          />
          <line
            x1="92.4366"
            y1="73.2437"
            x2="44.4366"
            y2="159.244"
            strokeWidth={strokeWidth}
          />
          <line
            x1="88.4366"
            y1="69.2437"
            x2="40.4366"
            y2="155.244"
            strokeWidth={strokeWidth}
          />
          <line
            x1="86.4366"
            y1="61.2437"
            x2="38.4366"
            y2="147.244"
            strokeWidth={strokeWidth}
          />
          <line
            x1="82.4366"
            y1="57.2437"
            x2="34.4366"
            y2="143.244"
            strokeWidth={strokeWidth}
          />
          <line
            x1="79.4366"
            y1="51.2437"
            x2="31.4366"
            y2="137.244"
            strokeWidth={strokeWidth}
          />
          <line
            x1="77.4366"
            y1="43.2437"
            x2="28.2126"
            y2="131.437"
            strokeWidth={strokeWidth}
          />
          <line
            x1="73.4366"
            y1="38.2437"
            x2="25.4366"
            y2="124.244"
            strokeWidth={strokeWidth}
          />
          <line
            x1="69.4366"
            y1="34.2437"
            x2="21.4366"
            y2="120.244"
            strokeWidth={strokeWidth}
          />
          <line
            x1="66.4366"
            y1="28.2437"
            x2="18.4366"
            y2="114.244"
            strokeWidth={strokeWidth}
          />
          <line
            x1="63.4366"
            y1="22.2437"
            x2="15.4366"
            y2="108.244"
            strokeWidth={strokeWidth}
          />
          <line
            x1="60.4366"
            y1="16.2437"
            x2="12.4366"
            y2="102.244"
            strokeWidth={strokeWidth}
          />
          <line
            x1="58.4366"
            y1="8.24368"
            x2="9.21262"
            y2="96.4367"
            strokeWidth={strokeWidth}
          />
        </>
      )}
    </svg>
  );
}
