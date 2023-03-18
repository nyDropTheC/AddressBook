import React from 'react';

import { StatusBar } from 'expo-status-bar';
import { FlatList, View } from 'react-native';

import { Button, Input, ListItem } from '@rneui/themed'
import * as SQLite from 'expo-sqlite';

const HomeDisplay = ( { navigation } ) => {
	const [ inputAddr, setAddr ] = React.useState ( '' );
	const [ presentAddresses, setPresentAddresses ] = React.useState ( [ ] );

	const db = SQLite.openDatabase ( 'addressbook.db' );

	const reloadPresent = ( ) => {
		db.transaction ( ctx => {
			ctx.executeSql ( 'SELECT * FROM addresses;', [ ], ( _, { rows } ) => {
				setPresentAddresses ( rows._array );
			} );
		}, null, null );
	};

	React.useEffect ( ( ) => {
		db.transaction ( ctx => {
			ctx.executeSql ( 'CREATE TABLE IF NOT EXISTS addresses (id INTEGER PRIMARY KEY NOT NULL, address TEXT NOT NULL);' );
		}, null, reloadPresent );
	}, [ ] );

	const addItem = ( ) => {
		db.transaction ( ctx => {
			ctx.executeSql ( 'INSERT INTO addresses (address) VALUES (?);', [ inputAddr ] );
		}, null, reloadPresent );
	};

	const removeItem = ( id ) => {
		db.transaction ( ctx => {
			ctx.executeSql ( 'DELETE FROM addresses WHERE id = ?;', [ id ] );
		}, null, reloadPresent );
	};
    
    const navigateToAddress = ( address ) => {
        navigation.navigate ( 'Map View', { address: address } );
    };

	return (
		<View>
			<Input
				labelStyle={ { marginTop: '2%' } } // A scientifically calculated perfect margin
				label='Placefinder' 
				placeholder='Type an address'
				onChangeText={ text => setAddr ( text ) }
				value={ inputAddr }
			/>
			<Button icon={ { name: 'save' } } title='Save' raised color='gray' onPress={ addItem }/>
			<FlatList
				style={ { marginTop: '2%' } }
				keyExtractor={ item => item.id.toString ( ) }
				renderItem={ ( { item } ) => {
                    return <ListItem topDivider bottomDivider onPress={ ( ) => navigateToAddress ( item.address ) } onLongPress={ ( ) => removeItem ( item.id ) }>
                        <ListItem.Content>
                            <ListItem.Title>{ item.address }</ListItem.Title>
                        </ListItem.Content>
                        <ListItem.Content right>
                            <ListItem.Subtitle style={ { color: 'gray' } }>View on map<ListItem.Chevron/></ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                } }
				data={ presentAddresses }
			/>
			<StatusBar style="auto" />
		</View>
	);
};

export default HomeDisplay;