import { strokeWidth } from '@/utils/constants';

export default function Pill({ fill }: { fill: string }) {
  return (
    <svg
      width="106"
      height="169"
      viewBox="0 0 106 169"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="4" y="4" width="98" height="161" rx="49" strokeWidth="8" />
      {fill === 'hatched' && (
        <>
          <line
            x1="98.9856"
            y1="38.2437"
            x2="31.2417"
            y2="159.618"
            strokeWidth={strokeWidth}
          />
          <line
            x1="94.3899"
            y1="34.2437"
            x2="25.6713"
            y2="157.365"
            strokeWidth={strokeWidth}
          />
          <line
            x1="91.3899"
            y1="28.2437"
            x2="19.7471"
            y2="156.604"
            strokeWidth={strokeWidth}
          />
          <line
            x1="89.3899"
            y1="21.2437"
            x2="17.7471"
            y2="149.604"
            strokeWidth={strokeWidth}
          />
          <line
            x1="84.3899"
            y1="19.2437"
            x2="12.7471"
            y2="147.604"
            strokeWidth={strokeWidth}
          />
          <line
            x1="83.3899"
            y1="10.2437"
            x2="11.7471"
            y2="138.604"
            strokeWidth={strokeWidth}
          />
          <line
            x1="78.3899"
            y1="7.24368"
            x2="6.7471"
            y2="135.604"
            strokeWidth={strokeWidth}
          />
          <line
            x1="71.852"
            y1="7.24368"
            x2="4.59549"
            y2="127.745"
            strokeWidth={strokeWidth}
          />
          <line
            x1="67.3899"
            y1="3.24368"
            x2="1.59549"
            y2="121.125"
            strokeWidth={strokeWidth}
          />
          <line
            x1="59.3899"
            y1="5.24368"
            x2="3.34281"
            y2="105.661"
            strokeWidth={strokeWidth}
          />
          <line
            x1="54.3899"
            y1="3.24368"
            x2="2.24174"
            y2="96.6758"
            strokeWidth={strokeWidth}
          />
          <line
            x1="47.7617"
            y1="3.24368"
            x2="2.4366"
            y2="84.4511"
            strokeWidth={strokeWidth}
          />
          <line
            x1="41.389"
            y1="3.24526"
            x2="7.05239"
            y2="64.2452"
            strokeWidth={strokeWidth}
          />
          <line
            x1="33.8507"
            y1="5.24611"
            x2="1.36416"
            y2="62.6972"
            strokeWidth={strokeWidth}
          />
          <line
            x1="104.39"
            y1="108.244"
            x2="75.6353"
            y2="159.762"
            strokeWidth={strokeWidth}
          />
          <line
            x1="100.39"
            y1="103.244"
            x2="66.7617"
            y2="163.494"
            strokeWidth={strokeWidth}
          />
          <line
            x1="101.744"
            y1="90.2437"
            x2="60.3175"
            y2="164.465"
            strokeWidth={strokeWidth}
          />
          <line
            x1="100.744"
            y1="80.2437"
            x2="53.4691"
            y2="164.944"
            strokeWidth={strokeWidth}
          />
          <line
            x1="100.744"
            y1="68.2437"
            x2="46.1587"
            y2="166.042"
            strokeWidth={strokeWidth}
          />
          <line
            x1="101.744"
            y1="56.2437"
            x2="43.7471"
            y2="160.154"
            strokeWidth={strokeWidth}
          />
          <line
            x1="102.206"
            y1="44.2437"
            x2="35.4366"
            y2="163.872"
            strokeWidth={strokeWidth}
          />
        </>
      )}
    </svg>
  );
}
