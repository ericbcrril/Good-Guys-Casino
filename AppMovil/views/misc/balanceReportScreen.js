import React, { useEffect, useState, useMemo } from 'react';
import { ScrollView, Text, View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import Collapsible from 'react-native-collapsible';
//Estilos
import {styles} from 'assets/styles/balanceReport';

const transactionsData = {
    "transactions": [
        { "date": "2024-01-10", "amount": 359, "reason": "jugando blackjack" },
        { "date": "2024-02-15", "amount": -200, "reason": "perdida en ruleta" },
        { "date": "2024-03-20", "amount": 500, "reason": "ganancia en póker" },
        { "date": "2024-04-25", "amount": 150, "reason": "jugando blackjack" },
        { "date": "2024-05-05", "amount": -100, "reason": "perdida en ruleta" },
        { "date": "2024-06-10", "amount": 200, "reason": "ganancia en póker" },
        { "date": "2024-07-15", "amount": -50, "reason": "perdida en ruleta" },
        { "date": "2024-08-20", "amount": 100, "reason": "jugando blackjack" },
        { "date": "2024-09-25", "amount": -300, "reason": "perdida en póker" },
        { "date": "2024-10-30", "amount": 400, "reason": "ganancia en póker" },
        { "date": "2024-11-05", "amount": -250, "reason": "perdida en ruleta" },
        { "date": "2024-12-10", "amount": 350, "reason": "jugando blackjack" }
    ]
};

const BalanceReport = () => {
    const [monthlyTransactions, setMonthlyTransactions] = useState({});
    const [isChartVisible, setIsChartVisible] = useState(false);
    const currentYear = new Date().getFullYear();
    const monthNames = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    const monthNumbers = [
        '01', '02', '03', '04', '05', '06',
        '07', '08', '09', '10', '11', '12'
    ];

    useEffect(() => {
        const transactions = transactionsData.transactions;
        const monthlyData = {};
        const initialChartData = Array(12).fill(0);

        transactions.forEach((transaction) => {
            const date = new Date(transaction.date);
            const year = date.getFullYear();
            const month = date.getMonth(); // Los meses son 0-indexados en JS

            if (year === currentYear) {
                if (!monthlyData[month]) {
                    monthlyData[month] = [];
                }
                monthlyData[month].push(transaction);
                initialChartData[month] += transaction.amount;
            }
        });

        setMonthlyTransactions(monthlyData);
    }, [currentYear]);

    const chartData = useMemo(() => {
        const initialChartData = Array(12).fill(0);
        Object.keys(monthlyTransactions).forEach((month) => {
            monthlyTransactions[month].forEach((transaction) => {
                initialChartData[month] += transaction.amount;
            });
        });
        return initialChartData;
    }, [monthlyTransactions]);

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <Text style={styles.title}>Informe de Balance</Text>
                {Object.keys(monthlyTransactions).map((month) => (
                    <View key={month} style={styles.monthContainer}>
                        <Text style={styles.monthTitle}>{monthNames[month]}</Text>
                        {monthlyTransactions[month].map((transaction, index) => (
                            <View key={index} style={styles.transaction}>
                                <Text style={transaction.amount > 0 ? styles.positive : styles.negative}>
                                    {transaction.amount > 0 ? '+' : ''}{transaction.amount}
                                </Text>
                                <Text style={styles.details}>{transaction.date} - {transaction.reason}</Text>
                            </View>
                        ))}
                    </View>
                ))}
            </ScrollView>
            <TouchableOpacity onPress={() => setIsChartVisible(!isChartVisible)}>
                <Text style={styles.chartToggle}>{isChartVisible ? 'Ocultar Gráfica' : 'Mostrar Gráfica'}</Text>
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
