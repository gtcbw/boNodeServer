import { ResultElement } from "./contract/result";
import { Survey } from "./contract/survey";
import { Voting } from "./contract/voting";

export const calculateVotingRatio = (survey: Survey, votings: Voting[]): ResultElement[] => {
    const elements: ResultElement[] = [];
    const allVotingsCount = votings.length;

    survey.options.forEach((option, index) => {
        const percentage = votings.filter(v => v.optionId === index.toString()).length / allVotingsCount;
        elements.push({ option, percentage });
    });

    return elements;
};