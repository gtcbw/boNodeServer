import { calculateVotingRatio } from'./calculation';
import { Survey } from './contract/survey';
import { Voting } from './contract/voting';

test('calculates correct percentage for votings', () => {
    const survey: Survey = { surveyId: "1", question: 'what?', options: ['0', '1', '2']};
    const votings: Voting[] = [
        {userId: "1", surveyId: "1", optionId: "0" }, 
        {userId: "1", surveyId: "1", optionId: "1" },
        {userId: "1", surveyId: "1", optionId: "1" },
        {userId: "1", surveyId: "1", optionId: "2" }
    ];
    const calculatedElements = calculateVotingRatio(survey, votings);

    expect(calculatedElements.length).toBe(3);
    expect(calculatedElements.find(x=>x.option === '0')?.percentage).toBe(0.25);
    expect(calculatedElements.find(x=>x.option === '1')?.percentage).toBe(0.5);
    expect(calculatedElements.find(x=>x.option === '2')?.percentage).toBe(0.25);
});