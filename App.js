import React from 'react';
import { StyleSheet, Text, View, TextInput} from 'react-native';
import Button from 'react-native-button';
import DatePicker from 'react-native-datepicker'


export default class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      date_birth:"03/03/2017",
      date_prev_birth:"03/05/2017",
      corrected_date: "Oi",
      weeks_gestacional_age: "0",
      days_gestacional_age: "0"
    }
  }

  calc() {
    let date_today = new Date();
    let date_birth = new Date(this.state.date_birth);
    
    let weeks_gestacional_age = parseInt(this.state.weeks_gestacional_age);
    let days_gestacional_age = parseInt(this.state.days_gestacional_age);
    days_gestacional_age += (weeks_gestacional_age * 7);
    console.log(days_gestacional_age);
    let date_prev_birth = new Date(date_birth.getTime() + 86400 * days_gestacional_age);
    this.state.date_prev_birth = date_prev_birth.toLocaleString();
    let life_time = date_today.getTime() - date_birth.getTime();
    let life_time_corrected = date_today.getTime() - date_birth.getTime();

    if(date_birth.getTime() < date_prev_birth.getTime()){
      let date_diff_birth = new Date(date_prev_birth.getTime() - date_birth.getTime());
      life_time_corrected = life_time - date_diff_birth;
      this.state.corrected_date = life_time_corrected / 1000 / 86400 / 7;
    } else {
      this.state.corrected_date = "Não é necessário corrigir a data dessa nenem, ele nasceu na data correta."
    }

    this.setState(this.state);

    console.log(this.state.date_birth);
    console.log(this.state.date_prev_birth);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Data de Nascimento</Text>
        <DatePicker
          style={{width: 200}}
          date={this.state.date_birth}
          mode="date"
          placeholder="select date"
          format="DD/MM/YYYY"
          minDate="01/01/2000"
          maxDate="01/01/3000"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0
            },
            dateInput: {
              marginLeft: 36
            }
            // ... You can check the source to find the other keys. 
          }}
          onDateChange={(date) => {this.setState({date_birth: date})}}
        />
        <Text>Idade Gestacional</Text>
        <Text>Semanas</Text>
        <TextInput
          style={{height: 40, width: 100, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => this.setState({weeks_gestacional_age: text})}
          value={this.state.weeks_gestacional_age}
        />
        <Text>Dias</Text>
        <TextInput
          style={{height: 40, width: 100, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => this.setState({days_gestacional_age: text})}
          value={this.state.days_gestacional_age}
        />
        <Text>Data de Prevista de Nascimento</Text>
        <Text>{this.state.date_prev_birth}</Text>

        {/* <DatePicker
          style={{width: 200}}
          date={this.state.date_prev_birth}
          mode="date"
          placeholder="select date"
          format="DD/MM/YYYY"
          minDate="01/01/2000"
          maxDate="01/01/3000"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0
            },
            dateInput: {
              marginLeft: 36
            }
            // ... You can check the source to find the other keys. 
          }}
          onDateChange={(date) => {this.setState({date_prev_birth: date})}}
        /> */}

        <Button
          style={{fontSize: 20, color: 'green'}}
          styleDisabled={{color: 'red'}}
          onPress={() => this.calc()}>
          Calcular! :)
        </Button>
        <Text>Idade Gestacional Corrigida (semanas)</Text>
        <Text>{this.state.corrected_date}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
