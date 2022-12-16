import {
    Link
} from "react-router-dom"
import { Navbar, Nav, Button, Container } from "react-bootstrap";
import market from '../components/market.png';
import React from 'react';
import { useState } from 'react';
//import { pairHashpack } from '../hashconnect/index';


const Navigation = ({ pairHashpack, accountId }) => {

    const [pairingString, setPairingString] = useState('')

    return (
        <Navbar expand="lg" bg="secondary" variant="dark">
            <Container>
                <Navbar.Brand href="#">
                    <img src={market} width="40" height="40" className="" alt="" />
                    &nbsp; Imaginarium NFT Marketplace
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/create">Create</Nav.Link>
                        <Nav.Link as={Link} to="/my-listed-items">My Listed Items</Nav.Link>
                        <Nav.Link as={Link} to="/my-purchases">My Purchases</Nav.Link>
                    </Nav>
                    <Nav>
                        {accountId ? (
                            <Nav.Link
                                accountId={accountId}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="button nav-button btn-sm mx-4">
                                <Button variant="outline-light">
                                    <p id='accountid'></p>
                                </Button>
                                {
                                    pairingString &&
                                    <>
                                        <h1>Pairing string</h1>
                                        <p>{pairingString}</p>
                                    </>
                                }
                            </Nav.Link>
                        ) : (
                            <Button onClick={async () => {
                                const saveData = await pairHashpack()
                                setPairingString(saveData.pairingString)
                            }} variant="outline-light">Connect Wallet</Button>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Navigation

