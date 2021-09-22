import React from 'react';
import { useState, useEffect } from 'react';
import {FlatList} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DataTable } from 'react-native-paper';



import { Button } from '../Components/Button';

import { 
  Container, 
  Title, 
  InputContainer, 
  Input,
  SubTitle,
  ContainerList,
  ContainerTable,
  ButtonList,
  TextList,
  Icon,
  Header
} from './styles';


interface RegisterEscolarity {
  code: string;
  type: string;
}


export function Home() {
  const [code, setCode] = useState('');
  const [type, setType] = useState('');
  const [register, setRegister] = useState<RegisterEscolarity[]>([]);

  function handleAddregister() {
    const data = {
      code: code,
      type: type
    }
    if(type != "" && code != ""){
      setRegister([...register, data])
      setCode('')
      setType('')

    }else{
      alert("Por favor, preencha todos os campos")
    }

  }

  function handleRemoveRegister(code: string) {
    setRegister(register => register.filter( c => c.code !== code))
  }

  function returnTable(){
    return(
      <ContainerTable>

          <SubTitle>Lista de Escolaridades</SubTitle>

          <DataTable>
            <DataTable.Header style={{height: 40, backgroundColor: 'orange', width:'400px', flex:'center'}}>
              <DataTable.Title style={{alignContent:'center', justifyContent:'center'}}>Código</DataTable.Title>
              <DataTable.Title style={{alignContent:'center', justifyContent:'center'}}>Type</DataTable.Title>
              <DataTable.Title style={{alignContent:'center', justifyContent:'center'}}>Excluir</DataTable.Title>

            </DataTable.Header>

          <FlatList 
            showsVerticalScrollIndicator={false}
            data={register}
            renderItem={({ index, item }) => (
              <>
                <DataTable.Row style={{backgroundColor: (index % 2 === 0 ? '#EEB76B': '#F05454')}}>
                  <DataTable.Cell style={{alignContent:'center', justifyContent:'center'}}>{item.code}</DataTable.Cell>
                  <DataTable.Cell style={{alignContent:'center', justifyContent:'center'}}>{item.type}</DataTable.Cell>
                  <DataTable.Cell style={{alignContent:'center', justifyContent:'center'}}><ButtonList onPress={() => handleRemoveRegister(item.code)}>Excluir</ButtonList></DataTable.Cell>
                </DataTable.Row>
                </>
            )}
          />
          </DataTable>
        </ContainerTable>
    )
  }

  useEffect(() => {
    async function loadData() {
      const getData = await AsyncStorage.getItem('@listregister');
      return getData !== null ? setRegister(JSON.parse(getData)) : null;
    }

    loadData()
  }, [])

  useEffect(() => {
    async function saveData() {
      await AsyncStorage.setItem('@listregister', JSON.stringify(register));
    }

    saveData();
  }, [register])
  

  return (
    <Container>
      <Header>
        <Icon name="app-registration"/>
        <Title>Escolaridade</Title>
      </Header>

      <InputContainer>
        <Input 
          placeholder="Digite o código da Escolaridade"
          placeholderTextColor= '#555'
          value={code}
          onChangeText={setCode}
        />
        <Input 
          placeholder="Digite a Escolaridade"
          placeholderTextColor= '#555'
          value={type}
          onChangeText={setType}
        />

        <Button title= "Cadastrar Escolaridade" onPress={handleAddregister} />
      </InputContainer>

      {register ? returnTable() : null}

    </Container>
  )
}