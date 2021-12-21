import {
    ResponsiveContainer,
    AreaChart,
    XAxis,
    YAxis,
    Area,
    Tooltip,
    CartesianGrid,
  } from "recharts";
  import { format, parseISO, subDays } from "date-fns";
  import styles from '../styles/Home.module.css'
  import {useDarkModeContext} from '../context/darkModeContext'
  
  const data: any[] = [];
  for (let num = 30; num >= 0; num--) {
    data.push({
      date: subDays(new Date(), num).toISOString().substr(0, 10),
      value: 1 + Math.random(),
    });
  }
  
  export default function ListeningChart() {
    const darkMode = useDarkModeContext()
    return (
        <ResponsiveContainer width="99%" aspect={5} debounce={1}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={darkMode.value ? "white" : "black"} stopOpacity={1} />
              {/* <stop offset="0%" stopColor="black" stopOpacity={0.4} /> */}
              <stop offset="100%" stopColor={darkMode.value ? "black" : "white"} stopOpacity={1} />
            </linearGradient>
          </defs>
          {/* #2451B7 */}
          <Area dataKey="value" stroke={darkMode.value ? "white" : "black"} fill="url(#color)" fillOpacity={10} />
          <XAxis
            dataKey="date"
            hide={true}
            axisLine={false}
            tickLine={false}
            tickFormatter={(str) => {
              const date = parseISO(str);
              if (date.getDate() % 20 === 0) {
                return format(date, "MMM, d");
              }
              return "";
            }}
          />
  
          <YAxis
            hide={true}
            dataKey="value"
            axisLine={false}
            tickLine={false}
            // tickCount={8}
            tickFormatter={(number) => `$${number.toFixed(2)}`}
          />
  {/* #0070f3 */}
          <Tooltip 
          content={<CustomTooltip />} 
          cursor={{stroke: darkMode.value ? "white" : "black",width:'2rem'}} 
          animationEasing="ease-in" isAnimationActive={true}
          />
  
          <CartesianGrid opacity={0.05} vertical={false} />
        </AreaChart>
        </ResponsiveContainer>
    );
  }
  
  function CustomTooltip({ active, payload, label }: {active?:any,payload?:any,label?:any}) {
    if (active) {
      return (
        <div className={styles.tooltip}>
          <h4>{format(parseISO(label), "eeee, d MMM, yyyy")}</h4>
          <p>${payload[0].value.toFixed(2)} CAD</p>
        </div>
      );
    }
    return null;
  }