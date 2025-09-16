// 主应用程序逻辑
class ChinaMapDashboard {
    constructor() {
        this.init();
    }

    init() {
        this.initializeMetrics();
        this.setupEventListeners();
        this.updateDateTime();

        // 初始化ECharts实例
        this.initCharts();

        console.log('中国2D地图数据看板初始化完成');
    }

    initializeMetrics() {
        // 初始化数据指标
        this.updateMetric('total-data', '1,234,567');
        this.updateMetric('province-count', '34');
        this.updateDateTime();

        // 设置定时更新
        setInterval(() => this.updateDateTime(), 1000);
    }

    updateMetric(elementId, value) {
        const element = document.getElementById(elementId);
        if (element) {
            element.textContent = value;
        }
    }

    updateDateTime() {
        const now = new Date();
        const formattedTime = now.toLocaleTimeString('zh-CN');
        const formattedDate = now.toLocaleDateString('zh-CN');
        this.updateMetric('update-time', `${formattedDate} ${formattedTime}`);
    }

    setupEventListeners() {
        // 可以添加事件监听器，比如窗口调整大小时的图表重绘
        window.addEventListener('resize', () => {
            this.resizeCharts();
        });
    }

    initCharts() {
        // 初始化趋势图表
        this.initTrendChart();

        // 初始化分布图表
        this.initDistributionChart();

        // 地图初始化在map.js中处理
    }

    initTrendChart() {
        const chartDom = document.getElementById('trend-chart');
        if (!chartDom) return;

        const chart = echarts.init(chartDom);
        const option = {
            title: {
                text: '数据趋势',
                textStyle: {
                    fontSize: 14,
                    fontWeight: 'normal'
                },
                left: 'center'
            },
            tooltip: {
                trigger: 'axis'
            },
            xAxis: {
                type: 'category',
                data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: [820, 932, 901, 934, 1290, 1330, 1320],
                type: 'line',
                smooth: true,
                itemStyle: {
                    color: '#5470c6'
                }
            }],
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            }
        };

        chart.setOption(option);
    }

    initDistributionChart() {
        const chartDom = document.getElementById('distribution-chart');
        if (!chartDom) return;

        const chart = echarts.init(chartDom);
        const option = {
            title: {
                text: '区域分布',
                textStyle: {
                    fontSize: 14,
                    fontWeight: 'normal'
                },
                left: 'center'
            },
            tooltip: {
                trigger: 'item'
            },
            legend: {
                orient: 'vertical',
                left: 'left'
            },
            series: [{
                name: '数据分布',
                type: 'pie',
                radius: '70%',
                data: [
                    { value: 1048, name: '华东' },
                    { value: 735, name: '华南' },
                    { value: 580, name: '华北' },
                    { value: 484, name: '西南' },
                    { value: 300, name: '西北' }
                ],
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }],
            color: ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de']
        };

        chart.setOption(option);
    }

    resizeCharts() {
        // 获取所有图表实例并重绘
        const chartInstances = [
            document.getElementById('trend-chart'),
            document.getElementById('distribution-chart'),
            document.getElementById('china-map')
        ];

        chartInstances.forEach(chartDom => {
            if (chartDom) {
                const chart = echarts.getInstanceByDom(chartDom);
                if (chart) {
                    chart.resize();
                }
            }
        });
    }
}

// 页面加载完成后初始化应用
document.addEventListener('DOMContentLoaded', () => {
    new ChinaMapDashboard();
});

// 导出全局访问（如果需要）
window.ChinaMapDashboard = ChinaMapDashboard;