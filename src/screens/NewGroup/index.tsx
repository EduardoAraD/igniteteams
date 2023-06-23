import { useState } from "react";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Button } from "@components/Button";
import { Input } from "@components/Input";

import { groupCreate } from "@storage/group/groupCreate";
import { AppError } from "@utils/AppError";

import { Container, Content, Icon } from "./styles";

export function NewGroup () {
  const navigation = useNavigation();

  const [group, setGroup] = useState('');

  async function handleNew(){
    try {
      if(group.trim().length === 0) {
        return Alert.alert('Novo Turma', 'informe o nome da turma.');
      }
      await groupCreate(group);
  
      navigation.navigate("players", { group });
    } catch(error) {
      if(error instanceof AppError) {
        Alert.alert('Novo Turma', error.message);
      } else {
        console.log(error);
        Alert.alert('Novo Turma', 'Não foi possível criar uma nova turma.');
      }
    }
  }

  return (
    <Container>
      <Header showBackButton />
      <Content>
        <Icon />
        <Highlight
          title="Nova turma"
          subtitle="Crie a turma para adicionar as pessoas"
        />

        <Input
          placeholder="Nome da turma"
          onChangeText={setGroup}
        />

        <Button
          title="Criar"
          onPress={handleNew}
          style={{ marginTop: 20 }}
        />
      </Content>
    </Container>
  )
}
