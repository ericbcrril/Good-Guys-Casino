import React, { useState } from 'react';
import { ScrollView, Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import Collapsible from 'react-native-collapsible';

const HelpScreen = () => {
  const [collapsedSections, setCollapsedSections] = useState({
    faq1: true,
    faq2: true,
    faq3: true,
    faq4: true,
    faq5: true,
    faq6: true,
    faq7: true,
    faq8: true,
  });

  const toggleSection = (section) => {
    setCollapsedSections((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Ayuda</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preguntas Frecuentes</Text>

        <TouchableOpacity onPress={() => toggleSection('faq2')}>
          <Text style={styles.question}>¿Cómo funcionan las apuestas?</Text>
        </TouchableOpacity>
        <Collapsible collapsed={collapsedSections.faq2}>
          <Text style={styles.answer}>
            Puedes realizar una apuesta antes de cada juego. Si ganas, tu apuesta se multiplicará, 
            y si pierdes, se restará de tu balance.
          </Text>
        </Collapsible>

        <TouchableOpacity onPress={() => toggleSection('faq3')}>
          <Text style={styles.question}>¿Cómo retiro mis ganancias?</Text>
        </TouchableOpacity>
        <Collapsible collapsed={collapsedSections.faq3}>
          <Text style={styles.answer}>
            Puedes retirarte en cualquier momento y tus ganancias se sumarán a tu balance total.
          </Text>
        </Collapsible>

        <TouchableOpacity onPress={() => toggleSection('faq5')}>
          <Text style={styles.question}>¿Cómo edito mis datos personales?</Text>
        </TouchableOpacity>
        <Collapsible collapsed={collapsedSections.faq5}>
          <Text style={styles.answer}>
            Para editar tus datos personales, ve a configuración y da un click a tu perfil o nombre de usuario.
          </Text>
        </Collapsible>

        <TouchableOpacity onPress={() => toggleSection('faq6')}>
          <Text style={styles.question}>¿Cómo elimino mi cuenta?</Text>
        </TouchableOpacity>
        <Collapsible collapsed={collapsedSections.faq6}>
          <Text style={styles.answer}>
            Para eliminar tu cuenta, contacta al soporte técnico a través de nuestro correo electrónico: soporte@casinoapp.com.
          </Text>
        </Collapsible>

        <TouchableOpacity onPress={() => toggleSection('faq7')}>
          <Text style={styles.question}>¿Cómo compro fichas?</Text>
        </TouchableOpacity>
        <Collapsible collapsed={collapsedSections.faq7}>
          <Text style={styles.answer}>
            Puedes comprar fichas en la tienda dentro de la aplicación. Selecciona el paquete de fichas que desees y sigue las instrucciones de pago.
          </Text>
        </Collapsible>

        <TouchableOpacity onPress={() => toggleSection('faq8')}>
          <Text style={styles.question}>¿Qué hago si tengo un problema con una compra?</Text>
        </TouchableOpacity>
        <Collapsible collapsed={collapsedSections.faq8}>
          <Text style={styles.answer}>
            Si tienes un problema con una compra, contacta a nuestro soporte técnico con los detalles de la transacción.
          </Text>
        </Collapsible>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Como Jugar</Text>
        <Text style={styles.content}>
          Revisa nuestros tutoriales para aprender a jugar todos los minijuegos disponibles en nuestra aplicación. Aquí te explicaremos las reglas y estrategias básicas para cada juego.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contacto</Text>
        <Text style={styles.content}>
          Si tienes alguna duda, sugerencia o problema, no dudes en contactarnos a través de nuestro 
          correo electrónico: soporte@casinoapp.com.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  question: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  answer: {
    fontSize: 16,
    marginBottom: 10,
  },
  content: {
    fontSize: 16,
  },
});

export default HelpScreen;
