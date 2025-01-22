import React, {useState, useEffect} from 'react'
import {FlatList, StatusBar, StyleSheet, Text, TextInput, View} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'green',
    textAlign: 'center',
    marginVertical: 10
  },
  search: {
    borderWidth: 1,
    borderColor: 'green',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    backgroundColor: 'white',
  },
  listedItems: {
    padding: 15,
    marginVertical: 5,
    backgroundColor: 'green',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'teal',
  },
 items: {
    fontSize: 14,
    color: 'white',
  },
});

let originalData = [];

const App = () => {
  const [mydata, setMyData] = useState([]);

  useEffect(() => {fetch("https://mysafeinfo.com/api/data?list=plantfamilies&format=json&case=default")
      .then((response) => {
        return response.json();
      })
      .then((myJson) => {
        if(originalData.length<1) {
          setMyData(myJson);
          originalData = myJson;
        }
      });
    }, []);

  //create the FilterData() function
    const FilterData = (text) => {
        if (text != '') {
          let myFilteredData = originalData.filter((item) =>
            item.PlantFamilyName.includes(text));
          setMyData(myFilteredData);
        }
        else {
          setMyData(originalData);
        }
    }

    const renderItem = ({item, index}) => {
      return (
          <View style={styles.listedItems}>
            <Text style={styles.items}>{item.PlantFamilyName}</Text>
          </View>
      );
    };

    return (
        <View style={styles.container}>
          <StatusBar/>
          <Text style={styles.title}>Search for Plant Families</Text>
          <TextInput style={styles.search} onChangeText={(text) => {FilterData(text)}}/>
          <FlatList data={mydata} renderItem={renderItem}/>
        </View>
    );
};

export default App;
