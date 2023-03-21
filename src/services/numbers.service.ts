
import axios from "./axios"

import {Numbers} from '../Interface/numbers.interface';

export class Number{

  static sendData=async(numbers:Numbers)=> axios.post('/numbers', numbers);
  static getData=async(limit: number, page:number, search:string)=> axios.get(`/numbers?limit=${limit}&page=${page}&search=${search}`)  

}