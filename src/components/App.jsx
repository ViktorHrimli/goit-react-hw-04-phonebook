import React, { useState, useEffect } from 'react';
import Notiflix from 'notiflix';
import { Box } from 'commonStyle/Common.styled';
import { nanoid } from 'nanoid';
import { Formes } from './FormSection/Form';
import { Filter } from './FilterSection/Filter';
import { Renderlist } from './ListContact/ListContact';
import { ContactList } from './ListContact/ListContact.styled';

export const Phonebook = () => {
  const [contact, setContact] = useState([]);
  const [filter, setFilter] = useState('');
  useEffect(() => {
    setContact(prev =>
      prev.concat(JSON.parse(localStorage.getItem('contact')) || [])
    );
  }, []);

  useEffect(() => {
    const pars = JSON.parse(localStorage.getItem('contact')) || [];
    if (!contact.map(item => item.name).includes(pars.map(item => item.name))) {
      localStorage.setItem('contact', JSON.stringify(contact));
    }
  }, [contact]);

  const hendleSubmit = ({ name, number }) => {
    const item = {
      id: nanoid(),
      name: name,
      number: number,
    };
    if (!contact.map(item => item.name).includes(name)) {
      setContact(prev => [item, ...prev]);
    } else {
      Notiflix.Notify.warning(`${name} is already is contacts`);
    }
  };

  const removeBtn = e => {
    setContact(contact.filter(item => item.id !== e.currentTarget.name));
  };

  const renderFilter = e => {
    setFilter(e.currentTarget.value.toLowerCase());
  };

  const renderContact = () => {
    const contacts = contact;
    return contacts.filter(item => item.name.toLowerCase().includes(filter));
  };

  const contacts = renderContact();
  return (
    <Box display="flex" flexDirection="column" alignItems="center" p={8}>
      <h1>Phonebook</h1>
      <Formes onSubmit={hendleSubmit} />
      <h2>Contacts</h2>
      <Filter value={filter} onFilter={renderFilter} />
      <ContactList>
        <Renderlist onRemove={removeBtn} contact={contacts} />
      </ContactList>
    </Box>
  );
};

// export class Phonebook extends Component {
//   state = {
//     contact: [],
//     filter: '',
//   };
//   componentDidMount() {
//     this.setState({
//       contact: JSON.parse(localStorage.getItem('contact')) || [],
//     });
//   }

//   componentDidUpdate(_, { contact }) {
//     const pars = JSON.parse(localStorage.getItem('contact')) || [];
//     if (!contact.map(item => item.name).includes(pars.map(item => item.name))) {
//       localStorage.setItem('contact', JSON.stringify(this.state.contact));
//     }
//   }

//   componentWillUnmount() {}
//   hendleSubmit = ({ name, number }) => {
//     const { contact } = this.state;
//     const item = {
//       id: nanoid(),
//       name: name,
//       number: number,
//     };
//     if (!contact.map(item => item.name).includes(name)) {
//       this.setState(({ contact }) => ({
//         contact: [item, ...contact],
//       }));
//     } else {
//       Notiflix.Notify.warning(`${name} is already is contacts`);
//     }
//   };
//   removeBtn = e => {
//     const { contact } = this.state;
//     this.setState({
//       contact: contact.filter(item => item.id !== e.currentTarget.name),
//     });
//   };
//   renderFilter = e => {
//     this.setState({ filter: e.currentTarget.value.toLowerCase() });
//   };

//   renderContact = () => {
//     const { contact, filter } = this.state;
//     return contact.filter(item => item.name.toLowerCase().includes(filter));
//   };

//   render() {
//     const { filter } = this.state;
//     const contacts = this.renderContact();
//     return (
//       <Box display="flex" flexDirection="column" alignItems="center" p={8}>
//         <h1>Phonebook</h1>
//         <Formes onSubmit={this.hendleSubmit} />
//         <h2>Contacts</h2>
//         <Filter value={filter} onFilter={this.renderFilter} />
//         <ContactList>
//           <Renderlist onRemove={this.removeBtn} contact={contacts} />
//         </ContactList>
//       </Box>
//     );
//   }
// }
