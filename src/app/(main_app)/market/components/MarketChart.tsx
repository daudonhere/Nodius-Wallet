'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import type { ApexOptions } from 'apexcharts';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

type CoinInfo = { id: string; symbol: string; name: string; };
type TimeRange = { value: string; label: string; days: number; };
type ChartType = 'candlestick' | 'area' | 'volume' | 'boxPlot';
type ApexCandlestickDataPoint = { x: number; y: [number, number, number, number]; };
type ApexLineAreaDataPoint = { x: number; y: number; };
type ApexBoxPlotDataPoint = { x: number; y: [number, number, number, number, number]; };
type CoinGeckoOhlcPoint = [number, number, number, number, number];
type CoinGeckoMarketChartResponse = { prices: [number, number][]; market_caps: [number, number][]; total_volumes: [number, number][]; };
type ChartSeries = {
  name?: string;
  data: ApexCandlestickDataPoint[] | ApexLineAreaDataPoint[] | ApexBoxPlotDataPoint[];
};

const timeRanges: TimeRange[] = [
  { value: '1d', label: '1D', days: 1 }, { value: '7d', label: '7D', days: 7 },
  { value: '1m', label: '1M', days: 30 }, { value: '3m', label: '3M', days: 90 },
  { value: '1y', label: '1Y', days: 365 },
];

interface MarketChartProps {
  token: CoinInfo;
  onBack: () => void;
}

export function MarketChart({ token, onBack }: MarketChartProps) {
  const [selectedTimeRange, setSelectedTimeRange] = useState<TimeRange>(timeRanges[2]);
  const [chartType, setChartType] = useState<ChartType>('candlestick');
  const [isLoading, setIsLoading] = useState(true);
  const [ohlcData, setOhlcData] = useState<ApexCandlestickDataPoint[]>([]);
  const [volumeData, setVolumeData] = useState<ApexLineAreaDataPoint[]>([]);
  const [series, setSeries] = useState<ChartSeries[]>([{ data: [] }]);
  const [options, setOptions] = useState<ApexOptions>({});

  useEffect(() => {
    if (!token) return;
    setIsLoading(true);
    const fetchData = async () => {
      const apiKey = process.env.COINGECKO_API_KEY;
      const ohlcUrl = `https://api.coingecko.com/api/v3/coins/${token.id}/ohlc?vs_currency=usd&days=${selectedTimeRange.days}${apiKey ? `&x_cg_demo_api_key=${apiKey}` : ''}`;
      const volumeUrl = `https://api.coingecko.com/api/v3/coins/${token.id}/market_chart?vs_currency=usd&days=${selectedTimeRange.days}&interval=daily${apiKey ? `&x_cg_demo_api_key=${apiKey}` : ''}`;

      try {
        const [ohlcResponse, volumeResponse] = await Promise.all([fetch(ohlcUrl), fetch(volumeUrl)]);
        if (!ohlcResponse.ok) throw new Error(`API returned status ${ohlcResponse.status} for OHLC data`);
        if (!volumeResponse.ok) throw new Error(`API returned status ${volumeResponse.status} for Volume data`);
        const ohlcJson: CoinGeckoOhlcPoint[] = await ohlcResponse.json();
        const volumeJson: CoinGeckoMarketChartResponse = await volumeResponse.json();
        if (!Array.isArray(ohlcJson)) throw new Error("OHLC data is not an array.");
        if (!volumeJson.total_volumes || !Array.isArray(volumeJson.total_volumes)) throw new Error("Volume data is not an array.");

        const formattedOhlc: ApexCandlestickDataPoint[] = ohlcJson.map((d) => ({ x: d[0], y: [d[1], d[2], d[3], d[4]] }));
        const formattedVolume: ApexLineAreaDataPoint[] = volumeJson.total_volumes.map((d: [number, number]) => ({ x: d[0], y: d[1] }));
        
        setOhlcData(formattedOhlc);
        setVolumeData(formattedVolume);
      } catch (error) { console.error("Failed to fetch chart data:", error); setOhlcData([]); setVolumeData([]); }
      finally { setIsLoading(false); }
    };
    fetchData();
  }, [token, selectedTimeRange]);

  useEffect(() => {
    if (chartType === 'candlestick') { setSeries([{ name: 'Price', data: ohlcData }]);
    } else if (chartType === 'volume') { setSeries([{ name: 'Volume', data: volumeData }]);
    } else if (chartType === 'boxPlot') {
      const boxPlotData: ApexBoxPlotDataPoint[] = ohlcData.map(d => ({ x: d.x, y: [d.y[2], d.y[0], d.y[3], d.y[3], d.y[1]] }));
      setSeries([{ name: 'Price Distribution', data: boxPlotData }]);
    } else {
      const singleValueData: ApexLineAreaDataPoint[] = ohlcData.map(d => ({ x: d.x, y: d.y[3] })); 
      setSeries([{ name: 'Price', data: singleValueData }]); 
    }
  }, [ohlcData, volumeData, chartType]);

  useEffect(() => {
    const chartColor = '#d946ef'; const volumeColor = '#888ea8';
    
    const plotOptions: ApexPlotOptions = {};
    const fill: ApexFill = {};
    const stroke: ApexStroke = {};
    let yaxis: ApexYAxis | ApexYAxis[] = { tooltip: { enabled: false }, labels: { style: { colors: '#8c8c8c' }, formatter: (value: number) => `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` } };
    let colors: string[] = [chartColor];

    const chartTypeValue: 'candlestick' | 'area' | 'volume' | 'boxPlot' | 'bar' = chartType === 'volume' ? 'bar' : chartType;

    if (chartType === 'candlestick') { 
        plotOptions.candlestick = { colors: { upward: '#26a69a', downward: '#ef5350' } }; 
        fill.type = 'solid';
        stroke.width = 1;
    } else if (chartType === 'volume') { 
        plotOptions.bar = { horizontal: false, columnWidth: '70%' }; 
        fill.type = 'solid'; 
        colors = [volumeColor]; 
        yaxis = { title: { text: 'Volume' }, labels: { formatter: (value: number) => { if(value > 1_000_000_000) return `${(value/1_000_000_000).toFixed(2)}B`; if(value > 1_000_000) return `${(value/1_000_000).toFixed(2)}M`; if(value > 1_000) return `${(value/1_000).toFixed(2)}K`; return value.toFixed(0); }}};
    } else if (chartType === 'area') { 
        stroke.curve = 'smooth';
        stroke.width = 2;
        stroke.colors = [chartColor]; 
        fill.type = 'gradient'; 
        fill.gradient = { type: 'vertical', shadeIntensity: 0.5, opacityFrom: 0.7, opacityTo: 0.2, stops: [0, 100], colorStops: [{ offset: 0, color: chartColor, opacity: 0.5 }, { offset: 100, color: '#FFFFFF', opacity: 0 }] };
    } else if (chartType === 'boxPlot') {
        plotOptions.boxPlot = { colors: { upper: '#26a69a', lower: '#ef5350' } };
        stroke.show = true;
        stroke.width = 1;
        stroke.colors = ['#a0a0a0'];
    } else {
        stroke.curve = 'smooth';
        stroke.width = 2;
        stroke.colors = [chartColor]; 
        fill.type = 'solid'; 
    }

    setOptions({
      chart: { type: chartTypeValue, height: 400, background: 'transparent', foreColor: '#f0f0f0', toolbar: { show: true, tools: { download: false, selection: true, zoom: true, zoomin: true, zoomout: true, pan: true } } },
      colors: colors, title: { text: `${token?.name || ''} - ${chartType.charAt(0).toUpperCase() + chartType.slice(1)} (${selectedTimeRange.label})`, align: 'left', style: { color: '#ffffff' } },
      xaxis: { type: 'datetime', labels: { style: { colors: '#8c8c8c' } } }, 
      yaxis: yaxis, grid: { borderColor: 'rgba(255, 255, 255, 0.1)' },
      plotOptions: plotOptions, stroke: stroke, fill: fill, tooltip: { enabled: false },
  
      responsive: [{
        breakpoint: 640,
        options: {
          title: { style: { fontSize: '14px' } },
          yaxis: {
            labels: {
              style: { fontSize: '9px' }
            }
          },
          xaxis: {
            labels: {
              rotate: -45,
                style: { fontSize: '9px' },
                formatter: function (timestamp: number): string {
                const date = new Date(timestamp as number);
                return `${date.getDate()} ${date.toLocaleString('default', { month: 'short' })}`;
                }
              },
              tickAmount: 6,
          }
        },
      }]
    });
  }, [token, selectedTimeRange, chartType, ohlcData, volumeData]);

  return (
    <div className="flex flex-col gap-4 p-2">
      <div className="flex flex-col gap-2 justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h2 className="text-xl font-bold">{token.name} ({token.symbol.toUpperCase()})</h2>
        </div>
        <div className="flex flex-row gap-2">
          <div className="flex gap-1">
            {timeRanges.map((range) => (<Button key={range.value} variant={selectedTimeRange.value === range.value ? "secondary" : "ghost"} size="sm" onClick={() => setSelectedTimeRange(range)} disabled={isLoading}>{range.label}</Button>))}
          </div>
        </div>
      </div>
      <div id="chart" className="w-full h-[370px] relative">
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-card/50 backdrop-blur-sm"><span>Loading Chart...</span></div>
        ) : (
          (() => {
            const chartTypeValue: 'candlestick' | 'area' | 'bar' | 'boxPlot' =
              chartType === 'volume' ? 'bar' : chartType;
            return (
              <Chart options={options} series={series} type={chartTypeValue} height="100%" width="100%" />
            );
          })()
        )}
      </div>
      <div className="flex flex-row px-2 justify-center gap-2">
        <div className="flex gap-1">
          <Button variant={chartType === 'candlestick' ? 'secondary' : 'ghost'} size="sm" onClick={() => setChartType('candlestick')} disabled={isLoading}>Candle</Button>
          <Button variant={chartType === 'area' ? 'secondary' : 'ghost'} size="sm" onClick={() => setChartType('area')} disabled={isLoading}>Area</Button>
          <Button variant={chartType === 'volume' ? 'secondary' : 'ghost'} size="sm" onClick={() => setChartType('volume')} disabled={isLoading}>Volume</Button>
          <Button variant={chartType === 'boxPlot' ? 'secondary' : 'ghost'} size="sm" onClick={() => setChartType('boxPlot')} disabled={isLoading}>Plot</Button>
        </div>
      </div>
    </div>
  );
}