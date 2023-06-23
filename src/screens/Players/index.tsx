import { Alert, FlatList, TextInput } from "react-native";
import { useEffect, useState, useRef } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { ButtonIcon } from "@components/ButtonIcon";
import { Input } from "@components/Input";
import { Filter } from "@components/Filter";
import { PlayerCard } from "@components/PlayerCard";
import { ListEmpty } from "@components/ListEmpty";
import { Button } from "@components/Button";
import { Loading } from "@components/Loading";

import { AppError } from "@utils/AppError";

import { PlayerStorageDTO } from "@storage/player/PlayerStorageDTO";
import { playersGetByGroupAndTeam } from "@storage/player/playersGetByGroupAndByTeam";
import { playerAddByGroup } from "@storage/player/playerAddByGroup";
import { playerRemoveByGroup } from "@storage/player/playerRemoveByGroup";
import { groupRemoveByName } from "@storage/group/groupRemoveByName";

import { Container, Form, HeaderList, NumberOfPlayers } from "./styles";

type RouteParams = {
  group: string;
}

export function Players () {
  const navigation = useNavigation();
  const { group } = useRoute().params as RouteParams;

  const [isLoading, setIsLoading] = useState(true);
  const [newPlayerName, setNewPlayerName] = useState('');
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);
  const [team, setTeam] = useState('Time A');

  const newPlayerNameInputRef = useRef<TextInput>(null);

  async function handleAddPlayer() {
    if(newPlayerName.trim().length === 0) {
      return Alert.alert('Nova pessoa', 'Informe o nome da pessoa para adicionar');
    }

    const newPlayer: PlayerStorageDTO = {
      name: newPlayerName,
      team,
    }

    try {
      await playerAddByGroup(newPlayer, group);

      newPlayerNameInputRef.current?.blur();

      setNewPlayerName('');
      fetchPlayersByTeam();
    } catch(error) {
      if(error instanceof AppError){
        Alert.alert("Nova pessoa", error.message);
      } else {
        console.log(error);
        Alert.alert("Nova pessoa", "Não foi possível adicionar")
      }
    }
  }

  async function fetchPlayersByTeam() {
    try{
      setIsLoading(true);

      const playersByTeam = await playersGetByGroupAndTeam(group, team);
      setPlayers(playersByTeam);
    } catch(error) {
      console.log(error);
      Alert.alert('Pessoas', 'não foi possível carregar as pessoas do time selecionado')
    } finally {
      setIsLoading(false);
    }
  }

  async function handlePlayerRemove(playerName: string) {
    try {
      await playerRemoveByGroup(playerName, group);

      fetchPlayersByTeam();
    } catch(error) {
      console.log(error);
      Alert.alert('Remover pessoa', 'Não foi possível remover essa pessoa.')
    }
  }

  async function groupRemove() {
    try {
      await groupRemoveByName(group);
      navigation.navigate('groups');
    } catch(error) {
      console.log(error);
      Alert.alert('Remover turma', 'Não foi possível remover a turma.')
    }
  }

  async function handleGroupRemove() {
    Alert.alert(
      'Remover',
      "Deseja remover a turma?",
      [
        { text: 'Não', style: 'cancel' },
        { text: 'Sim', onPress: groupRemove }
      ]
    )
  }

  useEffect(() => {
    fetchPlayersByTeam();
  }, [team])

  return (
    <Container>
      <Header showBackButton />
      <Highlight
        title={group}
        subtitle="adicione a galera e separe os times"
      />

      <Form>
        <Input
          inputRef={newPlayerNameInputRef}
          placeholder="Nome da pessoa"
          autoCorrect={false}
          value={newPlayerName}
          onChangeText={setNewPlayerName}
          onSubmitEditing={handleAddPlayer}
          returnKeyType="done"
        />
        <ButtonIcon icon="add" onPress={handleAddPlayer} />
      </Form>

      <HeaderList>
        <FlatList
          data={['Time A', 'Time B']}
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <Filter
              title={item} 
              isActive={item === team}
              onPress={() => setTeam(item)}
            />
          )}
          horizontal
        />
        <NumberOfPlayers>
          {players.length}
        </NumberOfPlayers>
      </HeaderList>

      {isLoading ? <Loading /> : 
        <FlatList
          data={players}
          keyExtractor={item => item.name}
          renderItem={({ item }) => (
            <PlayerCard
              name={item.name}
              onRemove={() => handlePlayerRemove(item.name)}
            />
          )}
          contentContainerStyle={[
            { paddingBottom: 100 },
            players.length === 0 && { flex: 1 }
          ]}
          ListEmptyComponent={() => (
            <ListEmpty
              message="Não há pessoas nesse time."
            />
          )}
          showsVerticalScrollIndicator
        />
      }

      <Button
        title="Remover turma"
        type="SECONDARY"
        activeOpacity={0.7}
        onPress={handleGroupRemove}
      />
    </Container>
  )
}
