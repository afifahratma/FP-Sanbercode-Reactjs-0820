import React from 'react'
import {Layout} from 'antd'

const{ Footer }= Layout


const FooterBar = () => {
    return(

    <Footer style={{ textAlign: 'center', position: 'fixed', right: '0px', bottom:'0px', left: '0px'}}>
         © 2020 Afifah Ratma Mahardika
    </Footer>

    )
}

export default FooterBar