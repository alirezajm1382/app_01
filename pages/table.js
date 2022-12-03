import Head from "next/head";
import axios from "axios";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import TableFormModal from "../components/TableFormModal";

export default function table() {
  const [fetchedData, setFetchedData] = useState([]);
  const [modalState, setModalState] = useState(false);
  const [addState, setAddState] = useState(false);
  const [selectedItem, setSelectedItem] = useState([]);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        setFetchedData(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleAddItem = (_item) => {
    setModalState(false);
    setFetchedData([...fetchedData, _item]);
  };

  const handleUpdateItem = (_item) => {
    setModalState(false);
    let index = -1;
    let temp = fetchedData.filter((f) => {
      return f.id === _item.id;
    });
    index = fetchedData.indexOf(temp[0]);
    setFetchedData([
      ...fetchedData.slice(0, index),
      _item,
      ...fetchedData.slice(index + 1),
    ]);
  };

  const handleOnDelete = (_item) => {
    setFetchedData(fetchedData.filter((item) => item.id !== _item.id));
  };

  return (
    <div>
      <Head>
        <title>App / Table</title>
        <meta name="description" content="Powered by love <3" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="mt-5 me-3">
        <div className="d-flex align-items-center justify-content-between">
          <h2>Table</h2>
          <Button
            variant="primary"
            onClick={() => {
              setModalState(true);
              setAddState(true);
            }}
          >
            Add Item
          </Button>
        </div>
        <hr />

        <div className="m-2">
          <Table hover>
            <thead>
              <tr>
                <th scope="col">Title</th>
                <th scope="col">Body</th>
                <th scope="col">#</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {fetchedData.map((item) => {
                return (
                  <tr key={item.id}>
                    <td>{item.title}</td>
                    <td>{item.body}</td>
                    <td>{item.userId}</td>
                    <td>
                      <div className="d-flex flex-column gap-2">
                        <Button
                          variant="outline-dark"
                          onClick={() => {
                            setSelectedItem(item);
                            setAddState(false);
                            setModalState(true);
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="outline-danger"
                          onClick={() => handleOnDelete(item)}
                        >
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </div>
      {modalState && (
        <TableFormModal
          setModalState={setModalState}
          addState={addState}
          handleAddItem={handleAddItem}
          handleUpdateItem={handleUpdateItem}
          selectedItem={selectedItem}
        />
      )}
    </div>
  );
}
