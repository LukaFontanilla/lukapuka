import styles from '../styles/Home.module.css'
import ExampleViz, {ReactECharts} from '../components/echartsViz'
import useSWR from 'swr'

// const fetcher = (...args: any) => fetch(...args).then((res) => res.json())

// series options
// {
//   name: 'sales',
//   type: 'bar',
//   data: []
// }

let option = {
  title: {
    text: 'ECharts Getting Started Example'
  },
  tooltip: {},
  dataset: {
    source: {},
    dimensions: ['date', 'cur1', 'cur2'],
  },
  legend: {
    data: ['Currency']
  },
  xAxis: [{
    type: 'time',
    // boundaryGap: false,
    // axisLine: { onZero: false },
    axisTick: {
      alignWithLabel: true
    },
  }],
  yAxis: [{
    type: 'value',
    name: 'JPY',
    position: 'right',
    // axisLabel: {
    //   formatter: '{value} ml'
    // }
  },
  {
    type: 'value',
    name: 'KRW',
    position: 'left',
    // axisLabel: {
    //   formatter: '{value} °C'
    // }
  }],
  series: [
    {
      type:'bar',
      name: 'cur1',
      encode: {
        x: 'date',
        y: 'cur1' // refer sensor 1 value 
      },
      yAxisIndex: 0
    },
    {
      type:'bar',
      name: 'cur2',
      encode: {
        x: 'date',
        y: 'cur2' // refer sensor 1 value 
      },
      yAxisIndex: 1
    }
  ]
}


const Art = () => {
    // const { data, error } = useSWR('/api/duckdbconn', fetcher)
    // console.log(data)
    // const echartsData = data?.map(d => [d.date, d.JPY, d.KRW])
    
    // option.dataset.source = echartsData

    // option.xAxis[0].data.push(x_axis)
    // option.series.push({
    //   name: 'KRW',
    //   type: 'bar',
    //   data: y_axis_krw
    // })
    // option.series.push({
    //   name: 'JPY',
    //   type: 'bar',
    //   data: y_axis_jpy
    // })

    // if (error) return <div>Failed to load</div>
    // if (!data) return <div>Loading...</div>

    return (
        <>
        <h2 className="title">
          Art △▼△▼△▼△▼△
        </h2>
        {/* {data.map((d) => (
          <>
            <p className={styles.codeBody}>Date: {d.date}</p>
            <p className={styles.codeBody}>Exchange Rate Date: {JSON.stringify(d.exchange_rate)}</p>
          </>
        ))} */}
        <p className={styles.codeBody}>
          Welcome to my art page! My art is mainly focused around seaweed prints (accomplished through seaweed pressing, photocopying and visual design), and 
          pieces that pull through my own personal sketches. All pieces incorporate a linear gradient/color scheme, additionally each of these are built into their own
          reusable card components that accept a few props: color (limited to the color duplicates created in figma), dark mode, as well as an optional animation.
        </p>
        <div style={{width:'100%', height:'60rem'}}>
        {/* <ExampleViz /> */}
        </div>
        {/* <div style={{width:'100%', height:'60rem'}}>
        <ReactECharts option={option}/>
        </div> */}
        <hr className="divider"/>
        </>
    )
}

export default Art