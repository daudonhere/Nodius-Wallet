'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import type { ApexOptions } from 'apexcharts';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

type CoinInfo = { id: string; symbol: string; name: string; };
type TimeRange = { value: string; label: string; days: number; };
type ChartType = 'candlestick' | 'area' | 'line';
type ApexCandlestickDataPoint = { x: number; y: [number, number, number, number]; };
type ApexLineAreaDataPoint = { x: number; y: number; };
type CoinGeckoOhlcPoint = [number, number, number, number, number];
type ChartSeries = {
  name?: string;
  data: ApexCandlestickDataPoint[] | ApexLineAreaDataPoint[];
};

const timeRanges: TimeRange[] = [
  { value: '1d', label: '1D', days: 1 }, { value: '7d', label: '7D', days: 7 },
  { value: '1m', label: '1M', days: 30 }, { value: '3m', label: '3M', days: 90 },
  { value: '1y', label: '1Y', days: 365 },
];

interface MarketChartProps {
  coin: CoinInfo;
  onBack: () => void;
}

export function MarketChart({ coin, onBack }: MarketChartProps) {
  const [selectedTimeRange, setSelectedTimeRange] = useState<TimeRange>(timeRanges[2]);
  const [chartType, setChartType] = useState<ChartType>('candlestick');
  const [isLoading, setIsLoading] = useState(true);
  const [ohlcData, setOhlcData] = useState<ApexCandlestickDataPoint[]>([]);
  const [series, setSeries] = useState<ChartSeries[]>([{ data: [] }]);
  const [options, setOptions] = useState<ApexOptions>({});

  useEffect(() => {
    if (!coin) return;
    setIsLoading(true);
    const fetchData = async () => {
      const apiKey = process.env.NEXT_PUBLIC_COINGECKO_API_KEY;
      const apiUrl = `https://api.coingecko.com/api/v3/coins/${coin.id}/ohlc?vs_currency=usd&days=${selectedTimeRange.days}${apiKey ? `&x_cg_demo_api_key=${apiKey}` : ''}`;
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error(`API returned status ${response.status}: ${response.statusText}`);
        const data: CoinGeckoOhlcPoint[] = await response.json();
        if (!Array.isArray(data)) throw new Error("Data received is not an array.");
        const formattedData: ApexCandlestickDataPoint[] = data.map((d) => ({ x: d[0], y: [d[1], d[2], d[3], d[4]] }));
        setOhlcData(formattedData);
      } catch (error) { console.error("Failed to fetch chart data:", error); setOhlcData([]); }
      finally { setIsLoading(false); }
    };
    fetchData();
  }, [coin, selectedTimeRange]);

  useEffect(() => {
    if (chartType === 'candlestick') {
      setSeries([{ name: 'Price', data: ohlcData }]);
    } else {
      const lineAreaData: ApexLineAreaDataPoint[] = ohlcData.map(d => ({ x: d.x, y: d.y[3] }));
      setSeries([{ name: 'Price', data: lineAreaData }]);
    }
  }, [ohlcData, chartType]);

  useEffect(() => {
    const chartColor = '#d946ef';
    const plotOptions: ApexPlotOptions = {};
    const fill: ApexFill = {};
    const stroke: ApexStroke = { curve: 'smooth', width: 2 };

    if (chartType === 'candlestick') {
      plotOptions.candlestick = { colors: { upward: '#26a69a', downward: '#ef5350' } };
      fill.type = 'solid';
    } else {
      stroke.colors = [chartColor];
      fill.type = 'gradient';
      fill.gradient = { type: 'vertical', shadeIntensity: 0.5, opacityFrom: 0.7, opacityTo: 0.2, stops: [0, 100], colorStops: [{ offset: 0, color: chartColor, opacity: 0.5 }, { offset: 100, color: '#FFFFFF', opacity: 0 }] };
    }

    setOptions({
      chart: { type: chartType, height: 400, background: 'transparent', foreColor: '#f0f0f0', toolbar: { show: true, tools: { download: false, selection: true, zoom: true, zoomin: true, zoomout: true, pan: true } } },
      colors: [chartColor],
      title: { text: `${coin?.name || ''} Price (${selectedTimeRange.label})`, align: 'left', style: { color: '#ffffff' } },
      xaxis: { type: 'datetime', labels: { style: { colors: '#8c8c8c' } } },
      yaxis: { tooltip: { enabled: false }, labels: { style: { colors: '#8c8c8c' }, formatter: (value: number) => `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` } },
      grid: { borderColor: 'rgba(255, 255, 255, 0.1)' },
      plotOptions: plotOptions, stroke: stroke, fill: fill,
      tooltip: { enabled: false, },
      responsive: [{ breakpoint: 640, options: { yaxis: { show: false }, title: { style: { fontSize: '14px' } } }, }]
    });
  }, [coin, selectedTimeRange, chartType]);

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h2 className="text-xl font-bold">{coin.name} ({coin.symbol.toUpperCase()})</h2>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-1">{timeRanges.map((range) => (<Button key={range.value} variant={selectedTimeRange.value === range.value ? "secondary" : "ghost"} size="sm" onClick={() => setSelectedTimeRange(range)} disabled={isLoading}>{range.label}</Button>))}</div>
          <div className="flex gap-1"><Button variant={chartType === 'candlestick' ? 'secondary' : 'ghost'} size="sm" onClick={() => setChartType('candlestick')} disabled={isLoading}>Candle</Button><Button variant={chartType === 'line' ? 'secondary' : 'ghost'} size="sm" onClick={() => setChartType('line')} disabled={isLoading}>Line</Button><Button variant={chartType === 'area' ? 'secondary' : 'ghost'} size="sm" onClick={() => setChartType('area')} disabled={isLoading}>Area</Button></div>
        </div>
      </div>
      <div id="chart" className="w-full h-[400px] relative">
        {isLoading ? (<div className="absolute inset-0 flex items-center justify-center bg-card/50 backdrop-blur-sm"><span>Loading Chart...</span></div>) : (<Chart options={options} series={series} type={chartType} height={400} width="100%" />)}
      </div>
    </div>
  );
}