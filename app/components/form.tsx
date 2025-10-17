import { Image } from 'expo-image';
import React, { useState } from 'react';
import {
    ActivityIndicator,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { Chore } from '../interfaces/types'; // Assuming this path is adjusted for RN project structure
import { Happy } from './happy';
import { Sad } from './sad';

// Note: For checkboxes in React Native, we'll use a simple TouchableOpacity-based implementation.
// In a real app, consider installing '@react-native-community/checkbox' for a native checkbox.

export default function Form() {
    const [isNice, setIsNice] = useState(false);
    const [status, setStatus] = useState('idle');
    const [loading, setLoading] = useState(false);
    const choresList: Chore[] = [
        {
            id: 1,
            name: "Did you clean your room today?",
            inputName: "cleanRoom",
            isCompleted: false,
        },
        {
            id: 2,
            name: "Did you brush your teeth?",
            inputName: "brushTeeth",
            isCompleted: false,
        },
        {
            id: 3,
            name: "Did you finish your chores?",
            inputName: "finishChores",
            isCompleted: false,
        },
    ];
    const [chores, setChores] = useState<Chore[]>(choresList);

    // useEffect(() => {
    //     const fetchChores = async () => {
    //         try {
    //             setLoading(true);
    //             const response = await fetch('/api/chores'); // Adjust base URL if needed for RN (e.g., full API URL)
    //             const data = await response.json();
    //             setChores(data);
    //         } catch (err) {
    //             console.log('error', err);
    //             // For error boundary in RN, you could use a library like react-error-boundary
    //             // or handle with Alert for simplicity
    //             Alert.alert('Error', 'Failed to load chores');
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     fetchChores();
    // }, []);


    const resetChores = () => {
        const resetChores = chores.map((item) => {
            return { ...item, isCompleted: false };
        });
        setChores(resetChores);
    };

    const tryAgain = () => {
        setIsNice(false);
        setStatus('idle');
        resetChores();
    };

    const onSubmit = () => {
        const choresCompleted = chores.every((chore) => chore.isCompleted === true);
        if (choresCompleted) {
            setIsNice(true);
            setStatus('resolved');
        } else {
            setIsNice(false);
            setStatus('resolved');
        }
    };

    const updateChoresListItem = (item: Chore) => {
        const updatedList = chores.map((chore) => {
            if (chore.id === item.id) {
                return {
                    ...chore,
                    isCompleted: !item.isCompleted,
                };
            } else {
                return chore;
            }
        });
        setChores(updatedList);
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text>Loading...</Text>
            </View>
        );
    }

    const renderCheckbox = (chore: Chore) => {
        const isChecked = chore.isCompleted;
        return (
            <TouchableOpacity
                key={chore.id}
                style={styles.checkboxContainer}
                onPress={() => updateChoresListItem(chore)}
                activeOpacity={0.7}
            >
                <View style={[styles.checkbox, isChecked && styles.checkboxChecked]}>
                    {isChecked && <Text style={styles.checkmark}>✓</Text>}
                </View>
                <Text style={styles.label}>{chore.name}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <View style={styles.form}>
                {chores.map(renderCheckbox)}
                <TouchableOpacity style={styles.submitButton} onPress={onSubmit}>
                    <Text style={styles.submitButtonText}>Submit</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.resultContainer}>
                {status === 'resolved' && isNice && (
                    <>
                        <Text style={styles.resultText}>You are on the nice list! <Happy /></Text>
                        <Image
                            source={require('@/assets/images/nice-list.jpg')}
                            style={styles.resultsImage}
                        />
                    </>
                )}
                {status === 'resolved' && !isNice && (
                    <>
                        <Text style={styles.resultText}>You are on the naughty list! <Sad /></Text>
                        <Image
                            source={require('@/assets/images/naughty-list.jpg')}
                            style={styles.resultsImage}
                        />
                    </>
                )}
                {status === 'resolved' && (
                    <TouchableOpacity style={styles.tryAgainButton} onPress={tryAgain}>
                        <Text style={styles.tryAgainButtonText}>Try Again</Text>
                    </TouchableOpacity>
                )}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#fff',
    },
    contentContainer: {
        padding: 20,
        justifyContent: 'center',
        width: '100%'
    },
    form: {
        marginTop: 20,
        marginBottom: 20,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        paddingLeft: 20,
        minHeight: 24,
    },
    checkbox: {
        width: 18,
        height: 18,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        marginRight: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    checkboxChecked: {
        backgroundColor: '#3b71ca',
        borderColor: '#3b71ca',
    },
    checkmark: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },
    label: {
        fontSize: 16,
    },
    submitButton: {
        backgroundColor: '#3b71ca',
        borderRadius: 6,
        paddingVertical: 10,
        paddingHorizontal: 24,
        alignSelf: 'center',
        marginTop: 10,
    },
    submitButtonText: {
        color: 'white',
        fontSize: 12,
        fontWeight: '600',
        textTransform: 'uppercase',
    },
    resultContainer: {
        alignItems: 'center',
        marginTop: 32,
    },
    resultText: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 10,
    },
    tryAgainButton: {
        marginTop: 40,
        backgroundColor: '#3b71ca',
        borderRadius: 6,
        paddingVertical: 12,
        paddingHorizontal: 20,
    },
    tryAgainButtonText: {
        color: 'white',
        fontSize: 14,
        fontWeight: '500',
        textTransform: 'uppercase',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    resultsImage: {
        height: 178,
        width: 290,
    },
});