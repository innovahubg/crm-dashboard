import React from 'react'

import { useSearchParams } from 'react-router-dom'

const PasswordRecovery = () => {

    const [searchParams, setSearchParams] = useSearchParams()

    const token = searchParams.get("token")

    return (
        <div>PasswordRecovery -{token}</div>
    )
}

export default PasswordRecovery