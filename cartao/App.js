import React, { useState, useEffect } from 'react';
import {ScrollView,View,Text,Image,TextInput,Switch,TouchableOpacity,Modal,Alert,StyleSheet,} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  // Estados
  const [bio, setBio] = useState('');
  const [textoModal, setTextoModal] = useState('');
  const [modalAberto, setModalAberto] = useState(false);
  const [ligado, setLigado] = useState(false);
  const [notificacao, setNotificacao] = useState('');

  const mensagens = [
    'Você tem uma nova mensagem!',
    'Alguém visualizou seu perfil.',
    'Não esqueça de beber água!',
  ];

  useEffect(() => {
    let intervalo;

    if (ligado) {
      intervalo = setInterval(() => {
        const numero = Math.floor(Math.random() * mensagens.length);
        setNotificacao(mensagens[numero]);
      }, 5000);
    } else {
      setNotificacao('');
    }

    return () => clearInterval(intervalo);
  }, [ligado]);

  function abrirModal() {
    setTextoModal(bio);
    setModalAberto(true);
  }

  function salvarBio() {
    setBio(textoModal);
    setModalAberto(false);
  }

  return (
    <SafeAreaView style={styles.tela}>
      <ScrollView contentContainerStyle={styles.conteudo}>

     

        <Image
         source={require('./assets/25273339.jpg')}
          style={styles.avatar}
        />

        <Text style={styles.nome}>Luiz Eduardo F Netto</Text>

        <Text style={styles.bio}>{bio}</Text>
        <TouchableOpacity style={styles.botao} onPress={abrirModal}>
          <Text style={styles.textoBranco}>Editar Bio</Text>
        </TouchableOpacity>

        <View style={styles.configuracao}>
          <Text style={styles.texto}>Receber Notificações</Text>
          <Switch value={ligado} onValueChange={setLigado} />
        </View>

        <TouchableOpacity
          style={styles.botao}
          onPress={() => Alert.alert('Aviso', 'Dados salvos com sucesso!')}
        >
          <Text style={styles.textoBranco}>Salvar</Text>
        </TouchableOpacity>

    {/* Notificação */}
        {notificacao !== '' && (
          <View style={styles.notificacao}>
            <Text style={styles.textoBranco}>{notificacao}</Text>
          </View>
        )}
      </ScrollView>

      <Modal visible={modalAberto} animationType="slide" transparent={true}>
        <View style={styles.fundoModal}>
          <View style={styles.caixaModal}>
            <TextInput
              style={styles.input}
              placeholder="Digite sua bio"
              value={textoModal}
              onChangeText={setTextoModal}
              multiline
            />
            <TouchableOpacity style={styles.botao} onPress={salvarBio}>
              <Text style={styles.textoBranco}>Salvar Bio</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  conteudo: {
    alignItems: 'center',
    padding: 20,
  },
  notificacao: {
    backgroundColor: '#333',
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginTop: 20,
  },
  nome: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 15,
  },
  bio: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 15,
  },
  configuracao: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 20,
  },
  texto: {
    fontSize: 16,
  },
  botao: {
    backgroundColor: '#4f46e5',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
  },
  textoBranco: {
    color: '#fff',
    fontSize: 16,
  },
  fundoModal: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 20,
  },
  caixaModal: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 8,
    padding: 10,
    height: 100,
    textAlignVertical: 'top',
    marginBottom: 15,
  },
});
