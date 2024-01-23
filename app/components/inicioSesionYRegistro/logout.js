import React from 'react'
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'

export default function LogOutButton(props) {
    const { setIsLoggedIn } = props

    const handleLogOut = () => {
            axios.post(
                process.env.API_URL + `clientes/logout`,
              null,
              {
                headers: {
                    'Authorization': 'Bearer '+ localStorage.getItem("token")
                },
              }
            )
            .then(() => {
                localStorage.removeItem("token")
                localStorage.removeItem("nombre")
                setIsLoggedIn(false)
            });
    };

    return (
        <div>
            <OverlayTrigger
                key="bottom"
                placement="bottom"
                overlay={
                    <Tooltip id={"tooltip-bottom"}>
                        Log Out
                    </Tooltip>
                }
                >
                <Button variant="light" size="lg" onClick={handleLogOut}>
                    <FontAwesomeIcon icon={faArrowRightFromBracket} />
                </Button>
            </OverlayTrigger>
         </div>
    );
}