import React, { useState, useEffect } from 'react';
import Notiflix from 'notiflix';
import { Box } from 'commonStyle/Common.styled';
import { nanoid } from 'nanoid';
import { Formes } from './FormSection/Form';
import { Filter } from './FilterSection/Filter';
import { Renderlist } from './ListContact/ListContact';
import { ContactList } from './ListContact/ListContact.styled';

export const Phonebook = () => {
  const [contact, setContact] = useState(() => {
    return JSON.parse(localStorage.getItem('contact') || []);
  });
  const [filter, setFilter] = useState('');

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
