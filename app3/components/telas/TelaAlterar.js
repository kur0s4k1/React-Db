import React, { Component } from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import { Actions } from 'react-native-router-flux';
import SQlite from 'react-native-sqlite-storage';


const db = SQlite.openDatabase({ name: 'tarefas.db' });
export default class TelaAlterar extends Component {

    state = {
        tarefa: ''
    }

    async alterar() {
        const afazeres = this.state.tarefa
        await db.transaction((tx) => {
            tx.executeSql('SELECT * FROM tarefas WHERE  ',
                [afazeres]
            );
        });
        await this.setState({ tarefa: '' })
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <Text style={{ fontSize: 20 }}>Alterar</Text>
                <TextInput style={{ fontSize: 15 }}
                    onChangeText={(texto) => this.setState({ tarefa: texto })}
                    value={this.state.tarefa}
                    multiline
                    numberOfLines={5}
                    textAlignVertical='top'
                />
                <View>
                    <Button title='salvar'
                        onPress={() => this.salvarTarefa()}
                    />
                    <Button title='Voltar'
                        onPress={() => Actions.telaInicio()}
                    ></Button>
                </View>

            </View>
        );
    }
}