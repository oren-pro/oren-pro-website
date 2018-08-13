import moment from 'moment';

export default [{
    id: 1,
    description: 'Gum',
    notes: '',
    amount: 195,
    createdAt: 0
},{
    id: 2,
    description: 'Ice',
    notes: '',
    amount: 250,
    createdAt: moment(0).subtract(4, 'days').valueOf()
},{
    id: 3,
    description: 'Radioe',
    notes: '',
    amount: 40250,
    createdAt: moment(0).add(4, 'days').valueOf()
}];