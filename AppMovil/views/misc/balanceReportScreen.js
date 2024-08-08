import React, { useEffect, useState, useMemo } from 'react';
import { ScrollView, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import Collapsible from 'react-native-collapsible';
import { stylesbalanceReport } from 'assets/styles/balanceReport';
//Usuario
import { userData, movementsData } from '../../constants/simulateUser';
//Scripts
import loadUserMovements from '../../scripts/user/loadUserMovements';

//const transactionsData = movementsData;

const BalanceReport = () => {
    const [monthlyTransactions, setMonthlyTransactions] = useState({});
    const [isChartVisible, setIsChartVisible] = useState(false);
    const currentYear = new Date().getFullYear();
    //console.log(transactionsData);
    //console.log(userMovements);
    const monthNames = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    const monthNumbers = [
        '01', '02', '03', '04', '05', '06',
        '07', '08', '09', '10', '11', '12'
    ];

    useEffect(() => {
        async function fetchData() {
            const transactionsData = await loadUserMovements();
            const monthlyData = {};
            transactionsData.forEach((transaction) => {
                const date = new Date(transaction.date);
                const year = date.getFullYear();
                const month = date.getMonth();
    
                if (year === currentYear) {
                    if (!monthlyData[month]) {
                        monthlyData[month] = [];
                    }
                    monthlyData[month].push(transaction);
                }
            });
            setMonthlyTransactions(monthlyData);
        }
    
        fetchData();
    }, [currentYear]);
    

    const chartData = useMemo(() => {
        const initialChartData = Array(12).fill(0);
        Object.keys(monthlyTransactions).forEach((month) => {
            monthlyTransactions[month].forEach((transaction) => {
                initialChartData[month] += transaction.totalggp;
            });
        });
        return initialChartData;
    }, [monthlyTransactions]);

    return (
        <View style={stylesbalanceReport.container}>
            <ScrollView style={stylesbalanceReport.scrollView}>
            <View>
                <Text style={stylesbalanceReport.title}>Informe de Balance</Text>
                {Object.keys(monthlyTransactions).length > 0 ? (
                    Object.keys(monthlyTransactions).map((month) => (
                        <View key={month} style={stylesbalanceReport.monthContainer}>
                            <Text style={stylesbalanceReport.monthTitle}>{monthNames[month]}</Text>
                            {monthlyTransactions[month].map((transaction, index) => (
                                <View key={index} style={stylesbalanceReport.transaction}>
                                    <Text style={transaction.totalggp > 0 ? stylesbalanceReport.positive : stylesbalanceReport.negative}>
                                        {transaction.totalggp > 0 ? '+' : ''}{transaction.totalggp}
                                    </Text>
                                    <Text style={stylesbalanceReport.details}>{transaction.date} - {transaction.reason}</Text>
                                </View>
                            ))}
                        </View>
                    ))
                ) : (
                    <Text style={stylesbalanceReport.noData}>Nada que mostrar...</Text>
                )}
            </View>
            </ScrollView>
            <TouchableOpacity onPress={() => setIsChartVisible(!isChartVisible)}>
                <Text style={stylesbalanceReport.chartToggle}>{isChartVisible ? 'Ocultar Gráfica' : 'Mostrar Gráfica'}</Text>
            </TouchableOpacity>
            <Collapsible collapsed={!isChartVisible}>
                <LineChart
                    data={{
                        labels: monthNumbers,
                        datasets: [
                            {
                                data: chartData,
                            },
                        ],
                    }}
                    width={Dimensions.get('window').width - 20}
                    height={220}
                    yAxisSuffix="P"
                    yAxisInterval={1}
                    chartConfig={{
                        backgroundColor: '#8e44ad',
                        backgroundGradientFrom: '#8e44ad',
                        backgroundGradientTo: '#9b59b6',
                        decimalPlaces: 2,
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        style: {
                            borderRadius: 16,
                        },
                        propsForDots: {
                            r: '6',
                            strokeWidth: '2',
                            stroke: '#9b59b6',
                        },
                    }}
                    bezier
                    style={{
                        borderRadius: 5,
                    }}
                />
            </Collapsible>
        </View>
    );
};

export default BalanceReport;
