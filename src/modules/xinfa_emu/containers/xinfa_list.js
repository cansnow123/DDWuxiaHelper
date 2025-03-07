import React, { Component } from 'react';
import {connect} from "react-redux";
import { Scrollbars } from 'react-custom-scrollbars';

import WuxiaPanel from '../../tiandao_ui/panel';
import {changeXinfaConfig, fetchXinfaList, placeXinfaSlot, selectXinfa} from "../actions";
import SearchBar from './xinfa_list_searchbar';

const xinfaPicPath = require.context('../assets/imgs/xinfa_icon', true);
import xinfaBgBlank from '../assets/imgs/ui/xinfa_bg_blank.png';

import './css/xinfa_list.css';
import {Button, ButtonGroup, Dropdown, DropdownButton, Glyphicon, DropdownItem} from "react-bootstrap";
import range from "lodash/range";

class XinfaList extends Component {
  constructor(props) {
    super(props);

    this.placeXinfaSlot = this.placeXinfaSlot.bind(this);
    // this.switchConfig = this.switchConfig.bind(this);
  }

  componentDidMount() {
    this.props.fetchXinfaList("");
  }

  onXinfaClick(name, event) {
    // 选择重数

    // 选择心法
    this.props.selectXinfa(name);
  }

  placeXinfaSlot(slotId, xinfaName) {
    this.props.placeXinfaSlot(slotId, xinfaName);
  }

  renderXinfaList() {
    if(this.props.xinfaList) {
      return this.props.xinfaList.map((xinfa) => {
        let itemClick = this.onXinfaClick.bind(this, xinfa.name);
        return (
          <div key={xinfa.name} styleName='xinfa-list-item' onClick={itemClick}>
            <img src={
              xinfaPicPath('./' + xinfa.name + '.png', true)
            } styleName='xinfa-img'/>
            <span styleName='xinfa-name'>{xinfa.name}</span>
            <span styleName='xinfa-level'>
              顺序[{
                this.props.curBrkthruData[xinfa.name] ?
                this.props.curBrkthruData[xinfa.name].fulfilledLevel + 1 : 0
              }]重
            </span>
            <span styleName='xinfa-placement'>
              <Dropdown size='sm' id={`${xinfa.name}-dropdown`}>
                <Dropdown.Toggle variant='primary' size="sm">放置心法</Dropdown.Toggle>
                <Dropdown.Menu styleName='select-slot-dropdown-menu'>
                  {
                    ['心法槽·壹 100%', '心法槽·贰 60%', '心法槽·叁 30%', '心法槽·肆 10%'].map((name, i) => (
                      <DropdownItem eventKey={name} key={name}
                        onSelect={(e) => {
                          this.placeXinfaSlot(i, xinfa.name);
                        }}
                      >
                        {name}
                      </DropdownItem>
                    ))
                  }
                </Dropdown.Menu>
              </Dropdown>{' '}
            </span>
          </div>
        );
      });
    } else {
      return <div>Loading...</div>;
    }
  }

  render() {
    return (
      <WuxiaPanel title="心法列表">
        {/*<div style={{textAlign: 'center'}}>*/}
          {/*<span style={{fontWeight: 'bold'}}>切换配置</span>{' '}*/}
          {/*<ButtonGroup styleName='switch-button-group'>*/}
            {/*{this.renderConfig()}*/}
          {/*</ButtonGroup>*/}
        {/*</div>*/}
        {/*<div style={{textAlign: 'center'}}>*/}
          {/*<span style={{fontWeight: 'bold'}}>心法槽</span>*/}
          {/*<div styleName='xinfa-slots-wrapper'>*/}
            {/*{this.renderSlots()}*/}
          {/*</div>*/}
        {/*</div>*/}

        <div>
          <SearchBar />
        </div>
        <div styleName='xinfa-list'>
          <Scrollbars styleName='xinfa-list-wrapper'>
            {this.renderXinfaList()}
          </Scrollbars>
        </div>
        <div>

        </div>
      </WuxiaPanel>
    );
  }

}

function mapStateToProps(state) {
  return {
    xinfaList: state.xinfaList,
    brkthruData: state.brkthruData,
    curBrkthruData: state.brkthruData.chongxue[state.brkthruData.current],
    slotsData: state.brkthruData.slots[state.brkthruData.current]
  };
}

export default connect(mapStateToProps, {
  fetchXinfaList,
  selectXinfa,
  placeXinfaSlot,
  changeXinfaConfig
})(XinfaList);