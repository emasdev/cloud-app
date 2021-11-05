import React, { useState, useEffect } from 'react';
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Image,
  Button
} from '@chakra-ui/react';
import {
  FiHome,
  FiSettings,
  FiMenu,
  FiBell,
  FiChevronDown,
  FiCalendar,
  FiBookOpen,
  FiUsers
} from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import logoImg from '../../img/logo.png';
import Main from './Main';
import FirebaseAuthService from '../../FirebaseAuthService';
import Profile from './Profile';
import Admin from './Admin';

export default function Dashboard({ children, user, userData, handleUserData }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [section, setSection] = useState('main');

  function handleSection(section) {
    setSection(section);
  }

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent
        user={user}
        onSelectSection={handleSection}
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} userData={userData} onSelectSection={handleSection} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
        {section == 'main' && <Main user={user} userData={userData} />}
        {section == 'profile' && <Profile user={user} userData={userData} handleUserData={handleUserData} />}
        {section == 'admin' && <Admin user={user} userData={userData} handleUserData={handleUserData} />}
      </Box>
    </Box>
  );
}

const SidebarContent = ({ onClose, onSelectSection, user, ...rest }) => {

  let LinkItems = [
    { name: 'Dashboard', icon: FiHome, section: "main" },
    { name: 'Agenda', icon: FiCalendar, section: "agenda" },
    { name: 'Estudios', icon: FiBookOpen, section: "estudios" },
    { name: 'Herramientas', icon: FiSettings, section: "herramientas" },
  ];

  const handleSelectSection = (section) => {
    onSelectSection(section);
  }

  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      color="idm.500"
      {...rest}
    >
      <Flex alignItems="center" mx="8" my={8} justifyContent="space-between">
        <Image m="auto" src={logoImg} />
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      <VStack>
        {LinkItems.map(item => (
          <NavItem key={item.name} icon={item.icon} onClick={() => handleSelectSection(item.section)}>
            {item.name}
          </NavItem>
        ))}
      </VStack>
    </Box>
  );
};

const NavItem = ({ icon, children, ...rest }) => {
  return (
    <Button w="100%" variant="link" style={{ textDecoration: 'none' }}>
      <Flex w="100%"
        align="center"
        py="4"
        pl="8"
        borderRadius="none"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'idm.500',
          color: 'white',
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Button>
  );
};

const MobileNav = ({ userData, onOpen, onSelectSection, ...rest }) => {

  const handleSelectSection = (section) => {
    onSelectSection(section)
  }

  const handleSignOut = () => {
    FirebaseAuthService.doSignOut();
  };
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}
    >
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: 'flex', md: 'none' }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        {/* <Image m="auto" src={logoImg} /> */}
      </Text>

      <HStack spacing={{ base: '0', md: '6' }}>
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<FiBell />}
        />
        <Flex alignItems={'center'}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: 'none' }}
            >
              <HStack>
                <Avatar size={'sm'} src={userData.imageUrl} />
                <VStack
                  display={{ base: 'none', md: 'flex' }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">{userData.nombre}</Text>
                </VStack>
                <Box display={{ base: 'none', md: 'flex' }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue('white', 'gray.900')}
              borderColor={useColorModeValue('gray.200', 'gray.700')}
            >
              <MenuItem onClick={() => handleSelectSection('profile')}>Perfil</MenuItem>
              <MenuDivider />
              <MenuItem onClick={handleSignOut}>Cerrar sesión</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};
