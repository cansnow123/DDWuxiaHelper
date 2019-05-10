export const SELECT_EQUIP_POS = 'SELECT_EQUIP_POS';
export const SET_MENPAI = 'SET_MENPAI';
export const SELECT_EQUIP = 'SELECT_EQUIP';
export const COPY_SET = 'COPY_SET';
export const SELECT_SET = 'SELECT_SET';
export const SELECT_ENHANCE = 'SELECT_ENHANCE';
export const SELECT_JIANGXIN = 'SELECT_JIANGXIN';
export const SELECT_LONGZHU = 'SELECT_LONGZHU';
export const SELECT_AFFIX = 'SELECT_AFFIX';
export const CLEAR_CURRENT_POS = 'CLEAR_CURRENT_POS';
export const CLEAR_CURRENT_CONFIG = 'CLEAR_CURRENT_CONFIG';
export const RESET_ALL = 'RESET_ALL';
export const BATCH_SET_EQUIPS = 'BATCH_SET_EQUIPS';

// 选择配置
export function selectSet(setId) {
  return {
    type: SELECT_SET,
    payload: setId
  };
}

// 选择装备部位
export function selectEquipPos(posId) {

  return {
    type: SELECT_EQUIP_POS,
    payload: posId
  };
}

// 设置门派
export function setMenpai(menpaiId) {
  return {
    type: SET_MENPAI,
    payload: menpaiId
  };
}

// 选择该部位的某装备
export function selectEquip(equipPosId, equipId) {
  return {
    type: SELECT_EQUIP,
    payload: {equipPosId, equipId}
  };
}

// 拷贝配置
export function copySet(src, dst) {
  return {
    type: COPY_SET,
    payload: {src, dst}
  };
}

// 选择精工等级
export function selectEnhance(equipPosId, level) {
  return {
    type: SELECT_ENHANCE,
    payload: {equipPosId, level}
  };
}

// 选择琢磨等级
export function selectJiangxin(equipPosId, level) {
  return {
    type: SELECT_JIANGXIN,
    payload: {equipPosId, level}
  };
}

// 选择珑铸
export function selectLongzhu(equipPosId, level) {
  return {
    type: SELECT_LONGZHU,
    payload: {equipPosId, level}
  };
}

// 选择词缀
export function selectAffix(equipPosId, affixPos, affixType, affixLevel) {
  return {
    type: SELECT_AFFIX,
    payload: {equipPosId, affixPos, affixType, affixLevel}
  };
}

// 清空当前槽某部位数据
export function clearCurrentPos(equipPosId) {
  return {
    type: CLEAR_CURRENT_POS,
    payload: {equipPosId}
  };
}
// 清空当前配置所有数据
export function clearCurrentConfig() {
  return {
    type: CLEAR_CURRENT_CONFIG,
    payload: {}
  };
}

// 完整清空所有数据
export function resetAll() {
  return {
    type: RESET_ALL,
    payload: {}
  };
}

// 批量设置装备
export function batchSetEquips(batchData) {
  return {
    type: BATCH_SET_EQUIPS,
    payload: {
      batchData
    }
  };
}