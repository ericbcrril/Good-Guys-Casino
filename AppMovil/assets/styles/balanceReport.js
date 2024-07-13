import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    scrollView: {
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    monthContainer: {
        marginBottom: 20,
        padding: 15,
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 1,
    },
    monthTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    transaction: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    positive: {
        color: 'green',
        fontWeight: 'bold',
        fontSize: 16,
        marginRight: 18,
    },
    negative: {
        color: 'red',
        fontWeight: 'bold',
        fontSize: 16,
        marginRight: 18,
    },
    details: {
        fontSize: 16,
    },
    chartToggle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#8e44ad',
        textAlign: 'center',
        marginVertical: 10,
    },
    chartTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
});