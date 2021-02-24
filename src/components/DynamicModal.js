import React, {useState} from 'react';
import { Modal } from 'react-bootstrap';

import { useModalContext } from './MyContext';

function DynamicModal(props){ 

const header = props.content.header;
const component = props.content.component;
const footer = props.content.footer;

const [modalOpen, toggleModelOpen] = useModalContext()

const styles = [
    {
        color:"#343a40",
        width:"100%"
    }
]

return  <>
            <Modal show={modalOpen}
                onHide = {()=> { toggleModelOpen(false)}}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                >
                <Modal.Header closeButton>
                    <h2 style={styles[0]}><center>{header}</center></h2>                                              
                </Modal.Header>

                <Modal.Body >
                    {component}
                </Modal.Body>
                
                <Modal.Footer>
                    {footer}
                </Modal.Footer>
            </Modal>
        </>
}
export default DynamicModal;
