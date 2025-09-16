// 中国地图可视化逻辑
class ChinaMapVisualization {
    constructor() {
        this.mapChart = null;
        this.init();
    }

    async init() {
        await this.loadMapData();
        this.initMapChart();
        this.setupMapInteractions();
    }

    async loadMapData() {
        try {
            // 加载阿里云中国地图GeoJSON数据
            const response = await fetch('https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const chinaGeoJSON = await response.json();

            // 注册中国地图
            echarts.registerMap('china', chinaGeoJSON);

            console.log('中国地图数据加载成功');
            this.mapData = chinaGeoJSON;

        } catch (error) {
            console.error('加载地图数据失败:', error);

            // 降级方案：使用模拟数据
            this.useFallbackData();

            // 显示错误提示
            this.showError('地图数据加载失败，使用模拟数据展示');
        }
    }

    useFallbackData() {
        // 模拟数据作为降级方案
        this.mapData = {
            type: 'FeatureCollection',
            features: [
                {
                    type: 'Feature',
                    properties: { name: '北京', value: 1000 },
                    geometry: { type: 'Point', coordinates: [116.4074, 39.9042] }
                },
                {
                    type: 'Feature',
                    properties: { name: '上海', value: 800 },
                    geometry: { type: 'Point', coordinates: [121.4737, 31.2304] }
                },
                {
                    type: 'Feature',
                    properties: { name: '广州', value: 600 },
                    geometry: { type: 'Point', coordinates: [113.2644, 23.1291] }
                },
                {
                    type: 'Feature',
                    properties: { name: '深圳', value: 700 },
                    geometry: { type: 'Point', coordinates: [114.0579, 22.5431] }
                }
            ]
        };
    }

    showError(message) {
        // 在页面上显示错误提示
        const errorDiv = document.createElement('div');
        errorDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #ff4757;
            color: white;
            padding: 10px 15px;
            border-radius: 5px;
            z-index: 1000;
            font-size: 14px;
        `;
        errorDiv.textContent = message;
        document.body.appendChild(errorDiv);

        // 5秒后自动消失
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.parentNode.removeChild(errorDiv);
            }
        }, 5000);
    }

    initMapChart() {
        const chartDom = document.getElementById('china-map');
        if (!chartDom) {
            console.error('地图容器未找到');
            return;
        }

        this.mapChart = echarts.init(chartDom);

        // 注册地图（这里需要真实的地图JSON数据）
        // 暂时使用模拟配置
        const option = this.getMapOption();
        this.mapChart.setOption(option);
    }

    getMapOption() {
        // 准备地图数据 - 为每个省份生成模拟数据
        const mapSeriesData = [];
        if (this.mapData && this.mapData.features) {
            // 如果是真实的地图数据，为每个省份生成数据
            this.mapData.features.forEach((feature, index) => {
                if (feature.properties && feature.properties.name) {
                    mapSeriesData.push({
                        name: feature.properties.name,
                        value: Math.floor(Math.random() * 1000) + 100 // 随机数据值
                    });
                }
            });
        } else {
            // 使用模拟数据
            mapSeriesData.push(
                { name: '北京', value: 1000 },
                { name: '上海', value: 800 },
                { name: '广州', value: 600 },
                { name: '深圳', value: 700 },
                { name: '杭州', value: 550 },
                { name: '南京', value: 450 },
                { name: '武汉', value: 400 },
                { name: '成都', value: 500 }
            );
        }

        return {
            title: {
                text: '中国省级数据分布',
                subtext: '数据可视化展示',
                left: 'center',
                textStyle: {
                    color: '#2c3e50',
                    fontSize: 18
                }
            },
            tooltip: {
                trigger: 'item',
                formatter: function (params) {
                    return `${params.name}<br/>数据值: ${params.value || 0}`;
                }
            },
            visualMap: {
                min: 100,
                max: 1000,
                calculable: true,
                inRange: {
                    color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffcc', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
                },
                textStyle: {
                    color: '#2c3e50'
                }
            },
            series: [{
                name: '省级数据',
                type: 'map',
                map: 'china',
                roam: true,
                emphasis: {
                    label: {
                        show: true
                    }
                },
                data: mapSeriesData,
                itemStyle: {
                    areaColor: '#323c48',
                    borderColor: '#404a59'
                },
                emphasis: {
                    itemStyle: {
                        areaColor: '#2a333d'
                    }
                },
                select: {
                    itemStyle: {
                        areaColor: '#ffa62b'
                    }
                }
            }]
        };
    }

    setupMapInteractions() {
        if (!this.mapChart) return;

        // 添加点击事件
        this.mapChart.on('click', (params) => {
            console.log('地图点击:', params);
            this.showProvinceDetails(params);
        });

        // 添加鼠标悬停事件
        this.mapChart.on('mouseover', (params) => {
            this.highlightProvince(params);
        });
    }

    showProvinceDetails(params) {
        // 显示省份详情
        alert(`选中地区: ${params.name}\n数据值: ${params.value ? params.value[2] : '无数据'}`);
    }

    highlightProvince(params) {
        // 高亮显示省份
        console.log('鼠标悬停:', params.name);
    }

    // 更新地图数据
    updateMapData(newData) {
        if (this.mapChart && newData) {
            const option = this.mapChart.getOption();
            option.series[0].data = newData;
            this.mapChart.setOption(option);
        }
    }

    // 调整地图大小
    resize() {
        if (this.mapChart) {
            this.mapChart.resize();
        }
    }
}

// 页面加载后初始化地图
document.addEventListener('DOMContentLoaded', () => {
    new ChinaMapVisualization();
});

// 导出全局访问
window.ChinaMapVisualization = ChinaMapVisualization;