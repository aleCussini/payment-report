import React from 'react';
import firebaseDataProvider from 'ra-data-firebase-client'
import './App.css';
import {Admin, Create, Edit, Resource} from "react-admin";
import * as firebase from "firebase";
import {TransactionForm} from "./transactions/TransactionForm";
import {TransactionList} from "./transactions/TransactionList";
import {TransactionShow} from "./transactions/TransactionShow";
import Icon from "@material-ui/core/Icon";
import {SummariesPOSList} from './transactions/summaries/SummariesPOSList'
import {customDataProvider} from "./customDataProvider";
import {authProvider} from "./customDataProvider"
import BrowserLayout from './BrowserLayout'
import Divider from '@material-ui/core/Divider';
import MobileLayout from './MobileLayout';

import {
    BrowserView,
    MobileView,
    isBrowser,
    isMobile
  } from "react-device-detect";

function EniIcon(props) {
    return (
        <Icon {...props}>
            <img
                alt={"ENI"}
                src={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAA4VBMVEX/1AD///8AAADOEUL/0QD/32f/9tX/3V///ff/1QD/1wD/3AD/2QD/2gD/3gDMAETqxQD1zgD50QDkwADIqQCjigBuXQDSsQD/4gDauAB4ZQCSfACtkgCOeADDpQC2mgBFOgA4LwApIgCGcQBmVwBVSAC9oAAwKAB3ZADfvADVswBGOwAbFwCqkADrliVNQQCZggAlHgAPDAA+NADojCjunR/3vBJdTwDxqR0eGQD/43f/++3/1yfjeS/dYjPbWTXUNTvlfirSKT7gbC/7xgr1sxfXSjnRFz75wRDaTjbjeSyRfkxIAAAOpklEQVR4nO2dB1fbyBqGHcWbu1M0SC6ybHDHBptmA4Fwd5ckhLT7/3/QnaIyo2ar2I6yes/ZsxsgRo/mm69N2dqb3121Qz/AzlURll8VYflVEZZfFWH5VRGWXxVh+VURll//OsJ3f5Rf//0rgfDPeq38qv+dQPjudyCs1f+sCMuuirD8qgjLr4qw/KoIy6+KsPyqCMuvirD8qgjLr4qw/KoIy6+KsPyqCMuvirD8qgjLr4qw/KoIy6+KMFEYJnwTIlTkg2ZWHkI4MnHMt4COuj3rl0DMQ0jutAGJ+gYkZnuiaVozaYz3pTyEyNK0qR6kALreOtW4hnFDvE/lIdSPKcXY0OWv0eFbXWqOpr+CmeYhxEPO4VsqHb7OqeZrYu/68bdQLk/TESA9bqkAE8MfPiET7AUiUXkIgeGAjA2ECZg/akG1fgFXk4sQeChX8/MQHtVKT/6EfShXxCdnUViSZlIwgVhHVBju2XLzEZ5uINRcK4UIP1z/8/zx+cv9hzoJRZhdKhchmm4iNNiAAYy+Pr898vTp8wPBexvJHISQ4JVMM2+2g4BtXAMQ1a5fjo7e+qKQL9d1gvBeLDY7IWmNFJorAm11TG8gIqj+4VnB8yg/fbl//7WOZF8EICyeOTMhOQ6MVwe6KYCrgf76Qkcvgs8ZSarvn53Mjpoyqj98faihgidpVkK0CgBqKxvalmSgU82A6EsMns8JdEyF7Nf3zy+c+fm12Gw2IyFshr3KqtVz//N8onXMqV4D5GUT4bf76/v7z8/fvbE+Ovpa6ChmJCQ3YUJPs4Xd1Ro0QJD6w8eNgygkf+F7oYOYjRDP4/kmLQJr0MTk9f5b7CRMAP78o9jmSSZC0IgH7BE2AoA8/EyPRwE/vSLVnUJMmFDmAJqJkIRzbE9jlqhB8CUDHpuVgXQHo+7qcaJpd+cnJsk2PTMQAjsxlRngGnz9noWPAqojBclcynwtI1NBnZ4Q4148HpuHpKa/zQioK4DYDPizFcpgqqkJYes2EZBmbxj+yIJ49FEdQb0b+ujHDLMxPWFEJFR1hmqw/iUYBDbhHR3dE3UEFxGffZPeUDNYaXO8AZHOREDz0c/PP7+9xDIGcvFP7+tqtRzjr3uR7ctiCWmt1z2JrOj9QQQsi9YRdfLXceN4//G7V069/PM1FA08f71a0ITcuHI7QJ20HjVTtIC6mTiIbcQfmOXQOrdXxRrpH+k/tHqqP3y4vr6mBUZESezmFI+QxUcAsVuLjtMOYracBsWN4drx7r2BSbDFet7UXq9/euXv22//e/+jTquIDz/Yc0OWdUcVTACKz7H8uUn62QYxW04DovnY7/cC2OjOabUBTODrB5pfX3/4AYnOiShc4mPpopi+k8MDuRDQKZ1NNiuNcnMOl2y/Sw/DGa2tXz8WH2DIfwGK6HGbMi/PRjiIJdQ6En3mhrBTSq/U4SLC2xjpPjUTYaCWVzSzzXl/Jt525m4pueMfEPCvSLT2uukmYjbCk3hCallYJ7g5nI4zL8w4WUU78IaQSBdTuppshKGmmiQRk6l7R5kLWaeH1wiYI7L2NoZ6sAsVGMRMWBAhtwll86wpZAJkvbd5iBKrCyt1YlVjfK3p6XTJoYAZ+aYcD74XX0qSM9NhekS8EB/ZZ4jCkT0GP4UI/7WPeAiNGLRjp7C6svV0L9oPsHPsLoeIYOp3T4kz+dOu2GUhFE8QYakTF33Sb0PWy9j2KYi3skpLL5GxXfD1Y9LrEJ4DYeTM/XFaB52BELPfte5G+dOWVzy2cQ13to34cgbRALDF/s1jgk6/YS0BQqbXzmil9dDpCYEx7R23kB21dmjZBvfot3NUw8bWkUvUDaJlgYWJXPCGlmMTT35bYS/1IdCRDr25eKcgIppaGwsDYUiWmnay5fsWgc5mH3Wsi3DPgh6E6+ArvEnvxLKuW3iJm5rAGbgLaN1LMN+T0eaEiXvDBCEfwyXsjVYIIAZ6Thig+vaoZhmWprIS6k61NhUOZ4CME7bY1qSl+WO/76wNc0Iy3bg1SmSBN/TN6IDwD6QzGDdCgGdkH702R04WrC24IQ0JTUjIoqdBMpGeiLl+NNT6PL8E8U7QCfFT+in6qfiLgHTCPb2zRoZEMDOh8AszXshZBPamLUwIUDtxdPAwLepG3Gs0TvnjRdaIRGSc636fY01tHUR3nTv76LU5hMKEmpyoQfjzHJuEyFHyiTpU/n1GiMcaz1eaC769SDwpNzoYLKlP7UZsaj9IjZiPcEoYwTFxHetU8TvHOhJPjljo5hsz6Bgz0wW1HntSyJJoPGBpjNz4mSYsi2jd3cdDh5BZ6QXiXU2DRGfihn3F/z0mPHTTYA7gLd+wSEMexcVXLPfE2hAlrmYFFKypdkXIku87aALqcWhVH/koF03ROtLOkYieJmDWvNK5UdI5qt/SL7HNcS1CkmpqVaGMfDeEbEvblOaKTdiYDdGGx5ujBve4XcxAaW3A4t8JZl7JsnmkGG1qo8tKuWs16zr+fGqgGrmYEYAwGSU/Euw8iUez2QRbC9MeEUizHq1tJ/ULYj4vlZ1mtVKoQ942tWiCFldMBfUo/M7C7gtenm9bs9SE01R2mmt/KXvi9bCWchQunJ/vhXKWbZWqT5Jrj3DCfoWdKlWBkYsw/RQqSGkGMfdO9oMoTSc2F2H/UIRpwn5JCbetrfMSHsxK2YaPfRAeztOkWbwo4ETJQbR9Yz1XxG8djnB7X5OLcNt0bRfa2tcUdKJk/9p6T0a+8xZpip6ite0yYr7zFokbh3as8y0HMd854KsDEm67DyIXIa9hD6YtK4xchCn6R7vQdm23fOfxSeYitghdmts4m3yEB8y9OaKxxabhfIQHzWqY2hBtWtrKR3jQmC80nS+SxzHnvRjOfsGD6jG54M9JqIcOeO1fHQySNnPmJNxDRLzcZCbTBmgsl7GIeW9vgTtg6mH5TyN7mzWN+c4IkbX5t6eURWx52O4IhieXsT8tNIoP/nkJQ13hs/mmI+wbdKYDJczeEbaPupW0pph40iQvIQiurI1t1D3Ok+oYUA2zoukEiXkSu8JxkrSDIfctSsGzlrQyhTppLCN7OLcja9UyArvEn5Q/sb17apj1DgoTc2hFHUma2XrCqfDchMGGm6i9AbTVZwAmFeB3KkBl2I+bttKUNPkJBtlMW3yEgNjdpjdPzkOU4/Zg0IxDzE0YPAe1dmoaIn+xAwGXeCfyPvglgaqhn5sImVAZxKsGQnrNKQchRsRsrUK3OcRWi/nv+iKBrVlDmw4TVAjvlEpOvolhbWMMkZq/TyYagU3FX63HT84GKy4AMVG7YKP4MiM/Yai+OB12lk0oEx4reRWRJ96oPejgYJl5gmswdCNFYJCQbNvnCedL8xPC8DFBTVthmeMMIt272yzUg2xjpM7lE/6jRPVVnUDEA1iajnO0Q09DBzEMeAMDZ4V7U+vOec2BowwTdgkTkiz9pmELGCLN15FBgjFdns5Pre7uPE1Ex+2WxSccXLZxM0flyherw88suPcxibfRdnZbIJ9h1TluBxHVOLVDTxNKa1Z8k3cgJz813LAmZbJnTXf+ECX5816G3MsLIShePH5VuADCYFrjsOhSLtlueK5AnraWgV1uOTzMPcfkb7a6i0CQnM1id3kpfw41rRkbHMdfXbwDOvAGIJAhrJxHw16iNl74scVr5p3aEWPE9pA5n5LQWCyCMLSO2OvWZJ95bBNieq9D9kBWNzxcq4G0Nui6k8tW1FqT52ySVhOLIIw4jsi2BfutxsnocuaieLWfNVxA+S4aNHG/Ixuk7ey3uo30JO7rSjqDUcj9pUrFyt8psz05FZi4Q+C7h1bg9k9vzFvykTXHPqzo8sh1AUnt70IIA3d+zYSvkZaI+8B9ybLjvVE/BYmfbytPK07/xpZHbq6QsIZRzBgqQXzmeAX3nMh5B/uNW/e8snZmDQPjIr41Uu5aFEOecP8iGm8axEII1fpi7Bw8dIaL+hnflWPHFAcgdDwRiR9X91aKrcjr+H6hG3w6sedVi7lHWCmVtPWwwZ9OdBovp30vHUFuMLRChwjdSyKUowuuESY4EtcHL+LeQkGEgXKtwctVL+Q7y7VASqbXAe/vlcUyumcbCdsSgOvm5jGGWgxhYKmU7U2H2GurOBaETC8UWoPAkgrQ3dAi+wwS9cXQ73Z9Vy/aUIshVJPQFjUY1JyIP4wGIjPDfl5wpYeOCPtGIAVDv6hK3IuI3GJ5GolYDKGyVNpB1B7dh7tx3AzyDdQKe0biLw4s/FsKjIgvRsj15O3omVjQjeXSPZ9PNgX2LNRxHLIZh3ei61Kp52+xkFZ9ksdQvM2Tnc5DpUacY782PHV+LZJ6naGDXkrW5y1A6OKlTHrDZuJtoI47msVFxIII5eT7BgLgVhtuwgighxg+QignfbMa8L867g9MsmEJFDjTMPZsaUGEUpHOsi6gOxWt5+b9Fmg4S4atVmfZbRqm2QB+egYNk+ibDx64Pio2oBRE6FfBLdERFimYfL6FCK8edVIZCnkdVeczt9kv417B+bTjnMav0b3jc7wDMZdNR2/eJllTJnmnic5iE9OiCJ1w4TcgeKtMfbGQTs9MFy7Eyu9V7ZzQcWjK86NlcMoBtEp78ixR2E801rsmdHypGggiFtcLvSDZTwnWj/HHvQqN+PGmshOxODHqtQfNRtJNMQVl3sJP9vd7BTs0DHbt54bblQshdLu8qW+Ly6mt4kkxfRonvteKnGVFqQhC9wxphisd9qAi1i3cjG3P03BLFbB+6CVs80LTlaKUmxDAiUuY8QqsHSv/bhOv/5D9ArqdKveuL78ZnPag/J6Ud2+itCi/72i4pfISzm9msxuq2eny1zTS/Dv3iKtfcwSr/zvgoZ+uCFWE5VdFWH5VhOVXRVh+VYTlV0VYflWE5VdFWH5VhOVXRVh+VYTlV0VYflWE5VdFWH79uwn/+h0I63+/iSd88+4/5dcffyUR/oaqCMuvirD8qgjLr4qw/KoIy6//A53IZvTB7YclAAAAAElFTkSuQmCC"}
                height={24} width={24}/>
        </Icon>
    );
}

function Q8Icon(props) {
    return (
        <Icon {...props}>
            <img alt={"Q8"}
                 src={"https://www.q8.it/o/q-8-2019-theme/images/header/Q8_Pos.svg"}
                 height={24} width={24}/>
        </Icon>
    );
}


const TransactionEdit = props => {
    return (
        <Edit {...props}>
            <TransactionForm {...props}/>
        </Edit>
    )
}

const TransactionCreate = props => {
    return (
        <Create {...props}>
            <TransactionForm {...props}/>
        </Create>
    )
}

function App() {
    return (
        <Admin layout = {{isMobile} ? MobileLayout : {BrowserLayout}}  title="Payment Report" dataProvider={customDataProvider} authProvider={authProvider}>
            <Resource
                name={"castro"}
                options={{label: 'Castro dei Volsci', id: 'castro'}}
                icon={EniIcon}
                list={TransactionList}
                edit={TransactionEdit}
                show={TransactionEdit}
                create={TransactionCreate}
            />
            <Resource
                name={"patrica"}
                options={{label: 'Patrica', id: 'patrica'}}
                icon={EniIcon}
                list={TransactionList}
                edit={TransactionEdit}
                show={TransactionEdit}
                create={TransactionCreate}
            />
            <Resource
                name={"sonnino"}
                options={{label: 'Sonnino', id: 'sonnino'}}
                icon={EniIcon}
                list={TransactionList}
                edit={TransactionEdit}
                show={TransactionEdit}
                create={TransactionCreate}
            />
            <Resource
                name= {"terracina"}
                icon={EniIcon}
                options={{label: 'Terracina', id: 'terracina'}}
                list={TransactionList}
                edit={TransactionEdit}
                show={TransactionShow}
                create={TransactionCreate}
            />
            <Resource
                name={"prossedi"}
                options={{label: 'Prossedi', id: 'prossedi'}}
                icon={Q8Icon}
                list={TransactionList}
                edit={TransactionEdit}
                show={TransactionEdit}
                create={TransactionCreate}
            />
             <Divider variant="inset"/>
            
            <Resource
                name={"summariesPOS"}
                options={{label: 'Aggregati POS', id: 'summariesPOS'}}
                list={SummariesPOSList}
                //edit={TransactionEdit}
                //show={TransactionShow}
                //create={TransactionCreate}
            />
            <Resource
                name={"reportPOS"}
                options={{label: 'Report POS', id: 'reportPOS'}}
                list={TransactionList}
                edit={TransactionEdit}
                show={TransactionShow}
                create={TransactionCreate}
            /> 
            
        </Admin>
    );
}

export default App;
