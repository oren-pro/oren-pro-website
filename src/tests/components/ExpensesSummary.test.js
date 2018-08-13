import React from 'react';
import { shallow } from 'enzyme';
import { ExpensesSummary } from '../../components/ExpensesSummary';
import expenses from '../fixtures/expenses';

test('should render with no expenses', () => {
    const wrapper = shallow(<ExpensesSummary expenseCount={0} expensesTotal={0} />);
    expect(wrapper).toMatchSnapshot();
});

test('should render with one expenses', () => {
    const wrapper = shallow(<ExpensesSummary expenseCount={1} expensesTotal={254} />);
    expect(wrapper).toMatchSnapshot();
});

test('should render with all expenses', () => {
    const wrapper = shallow(<ExpensesSummary expenseCount={5} expensesTotal={12254} />);
    expect(wrapper).toMatchSnapshot();
});