import React, { useEffect, useState } from "react";
import { IonInput, IonList, IonItem } from "@ionic/react";
import { Link } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { database } from "../firebase"; 

const SearchBar: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [results, setResults] = useState<{ id: string; name: string }[]>([]);
    const [allTopics, setAllTopics] = useState<{ id: string; name: string }[]>([]);
  
    useEffect(() => {
      const fetchAllTopics = async () => {
        try {
          const topicsRef = collection(database, "topics");
          const querySnapshot = await getDocs(topicsRef);
          
          const fetchedTopics = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            name: doc.data().name,
          }));
          setAllTopics(fetchedTopics); // Store all topics to filter locally
        } catch (error) {
          console.error("Error getting topics: ", error);
        }
      };
  
      fetchAllTopics();
    }, []);
  
    useEffect(() => {
      // Filter topics locally based on the search query (matching first letters)
      if (searchQuery === "") {
        setResults([]);
      } else {
        const filteredResults = allTopics.filter((topic) =>
          topic.name.toLowerCase().startsWith(searchQuery.toLowerCase())
        );
        setResults(filteredResults);
      }
    }, [searchQuery, allTopics]);
  
    const handleInput = (e: any) => {
      setSearchQuery(e.target.value); // Update the search query
    };
  
    return (
      <div className="search-container">
        <IonInput
          className="search-bar"
          placeholder="Procure Tópicos..."
          value={searchQuery}
          onIonInput={handleInput}
        />
        {results.length > 0 && (
          <IonList className="dropdown-content">
            {results.map((result) => (
              <IonItem key={result.id} button>
                <Link className="result-topic" to={`/chat/${result.id}`}>{result.name}</Link>
              </IonItem>
            ))}
          </IonList>
        )}
      </div>
    );
  };
  
  export default SearchBar;