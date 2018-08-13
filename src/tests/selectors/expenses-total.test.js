import React from 'react';
import { shallow } from 'enzyme';
import expensesTotal from '../../selectors/expenses-total';
import expenses from '../fixtures/expenses';

test('should return 0 if no expenses', () => {
    const res = expensesTotal([]);
    expect(res).toBe(0);
});

test('should correctly add up a single expense', () => {
    const res = expensesTotal([expenses[1]]);
    expect(res).toBe(250);
});

test('should correctly add up expenses', () => {
    const res = expensesTotal(expenses);
    expect(res).toBe(40695);
});