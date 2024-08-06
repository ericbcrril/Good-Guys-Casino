import React, { useEffect, useState, useRef } from 'react';
import { ScrollView, Text, View, TouchableOpacity, Animated, Dimensions, TextInput } from 'react-native';
import { Picker  } from '@react-native-picker/picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// Componentes
import { WhiteBox, WhiteBoxTitle } from '../../components/misc/components';
import { FormInput, LabelForm, PurpleButton, ButtonText } from '../../components/forms/formComponents';
// Estilos
import { stylesbalanceReport } from '../../assets/styles/balanceReport';
import { styles } from '../../assets/styles/styles';

const PaymentScreen = () => {
    const [selectedValue, setSelectedValue] = useState("paypal");
    const [formVisible, setFormVisible] = useState(false);
    const [formRVisible, setFormRVisible] = useState(false);
    const translateY = useRef(new Animated.Value(Dimensions.get('window').height)).current;

    useEffect(() => {
        Animated.timing(translateY, {
            toValue: formVisible || formRVisible ? -30 : Dimensions.get('window').height,
            duration: 500,
            useNativeDriver: true,
        }).start();
    }, [formVisible, formRVisible]);

    const Paypal = () => (
        <View>
            <LabelForm>Correo electronico:</LabelForm>
            <FormInput></FormInput>
        </View>
    );

    const DebitCard = () => (
        <View>
            <LabelForm>Titular:</LabelForm>
            <FormInput></FormInput>
            <LabelForm>Numero de la Tarjeta:</LabelForm>
            <FormInput keyboardType="numeric"></FormInput>
            <LabelForm>Fecha de vencimiento:</LabelForm>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <FormInput keyboardType="numeric" style={{width: 100}}></FormInput>
                <Text style={{fontSize: 32}}>/</Text>
                <FormInput keyboardType="numeric" style={{width: 100}}></FormInput>
            </View>
            <LabelForm keyboardType="numeric">Codigo de seguridad CVV:</LabelForm>
            <FormInput></FormInput>
            <LabelForm>Direccion:</LabelForm>
            <FormInput></FormInput>
        </View>
    );

    const Form = () => (
        <Animated.View style={[formStyles.formContainer, { transform: [{ translateY }] }]}>
            {formRVisible ? 
            <WhiteBox>
            <MaterialIcons name='close' size={22} onPress={() => setFormRVisible(false)}
                style={{alignSelf: 'flex-end'}}/>
                <View style={{flexDirection: 'row', alignItems: 'center', margin: 30, marginLeft: 80}}>
                <TextInput keyboardType='numeric' placeholder='00.00' style={{fontSize: 28}}/>
                <Text style={{fontSize: 28}}>GGP</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', margin: 30, marginLeft: 80}}>
                <TextInput keyboardType='numeric' value='00.00' editable={false} style={{fontSize: 28}}/>
                <Text style={{fontSize: 28}}>$USD</Text>

</View>
            <PurpleButton><ButtonText>Retirar</ButtonText></PurpleButton>
            </WhiteBox>
            :formVisible ? 
            <WhiteBox>
            <MaterialIcons name='close' size={22} onPress={() => setFormVisible(false)}
                style={{alignSelf: 'flex-end'}}/>
            <LabelForm>Nombre:</LabelForm>
            <FormInput></FormInput>
            {selectedValue === 'paypal' ? <Paypal/>:<DebitCard/>}
            <Picker selectedValue={selectedValue}
            onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}>
            <Picker.Item label="Tarjeta de Debito" value="debitCard" />
            <Picker.Item label="Paypal" value="paypal" />
            </Picker>
            <PurpleButton><ButtonText>Guardar</ButtonText></PurpleButton>
            </WhiteBox>
            :null} 
        </Animated.View>
    );

    return (
        <View style={styles.mainHome}>
            <ScrollView>
                <Text style={stylesbalanceReport.title}>Métodos de Pago</Text>
                <WhiteBox>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <WhiteBoxTitle>Paypal de Juan</WhiteBoxTitle>
                        <MaterialIcons name='edit' size={24} />
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <MaterialIcons name='paypal' size={24} />
                        <MaterialIcons name='navigate-next' size={24} onPress={()=> setFormRVisible(!formRVisible)}/>
                    </View>
                </WhiteBox>
                <WhiteBox>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <WhiteBoxTitle>Tarjeta 1</WhiteBoxTitle>
                        <MaterialIcons name='edit' size={24} />
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <MaterialIcons name='credit-card' size={24} />
                        <MaterialIcons name='navigate-next' size={24} onPress={()=> setFormRVisible(!formRVisible)}/>
                    </View>
                </WhiteBox>
            </ScrollView>
            <TouchableOpacity onPress={() => setFormVisible(!formVisible)}>
                <View style={[stylesbalanceReport.monthContainer, { alignItems: 'center' }]}>
                    <Text style={{ fontWeight: 'bold' }}>+ Nuevo método</Text>
                </View>
            </TouchableOpacity>
            {formVisible || formRVisible ? <Form />:false}
        </View>
    );
};

const formStyles = {
    formContainer: {
        position: 'absolute',
        height: '100%',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 30,
    },
    // Otros estilos que necesites
};

export default PaymentScreen;
