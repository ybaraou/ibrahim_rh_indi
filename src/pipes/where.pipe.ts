import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { parseObjectLiteral } from '../utils/js-parse-object-literal';
import { object } from 'dot-object';
import { WHERE_PIPE_FORMAT, WHERE_PIPE_TOO_LONG } from '../errors';
import { PrimitiveType } from '../types';

/** Convert a string like "id: 12, b: 'Anand'" to { id: 12, name: "Anand" } */
@Injectable()
export class WherePipe implements PipeTransform {
  transform(value: string): Record<string, any> | undefined {
    const queryFilters = [
      'lt',
      'lte',
      'gt',
      'gte',
      'equals',
      'not',
      'contains',
      'startsWith',
      'endsWith',
      'every',
      'some',
      'none',
    ];
    const additiveQueryFilter = ['includes', 'include', 'equal', 'equalTo'];
    if (value == null) return undefined;
    try {
      const rules = parseObjectLiteral(value);

      const items: Record<string, any> = {};
      rules.forEach((rule) => {
        let ruleKey = rule[0];
        let ruleValue = rule[1];
        let valueType: PrimitiveType = 'string';
        if (
          ruleValue &&
          ruleValue.endsWith(')') &&
          ruleValue.split(' ').length > 1
        ) {
          if (ruleValue.split(' ')[1].startsWith('int(')) {
            ruleValue = /\(([^)]+)\)/.exec(ruleValue)![1];
            valueType = 'number';
          } else if (
            ruleValue.split(' ')[1].startsWith('date(') ||
            ruleValue.split(' ')[1].startsWith('datetime(')
          )
            ruleValue = new Date(
              /\(([^)]+)\)/.exec(ruleValue)![1],
            ).toISOString();
          else if (ruleValue.split(' ')[1].startsWith('float(')) {
            ruleValue = /\(([^)]+)\)/.exec(ruleValue)![1];
            valueType = 'float';
          } else if (ruleValue.split(' ')[1].startsWith('string('))
            ruleValue = /\(([^)]+)\)/.exec(ruleValue)![1];
          else if (
            ruleValue.split(' ')[1].startsWith('boolean(') ||
            ruleValue.split(' ')[1].startsWith('bool(')
          ) {
            valueType = 'boolean';
            ruleValue = /\(([^)]+)\)/.exec(ruleValue)![1];
          }
        }
        //
        let restToValidate = ruleKey.split('.');
        if (restToValidate.length > 3)
          throw new BadRequestException(
            WHERE_PIPE_TOO_LONG.replace('$key', ruleKey),
          );
        restToValidate.shift();
        if (restToValidate.length == 2) restToValidate.shift();
        else if (
          restToValidate.length == 1 &&
          ![...queryFilters, ...additiveQueryFilter].includes(restToValidate[0])
        ) {
          ruleKey = `${ruleKey}.equals`;
          restToValidate = [ruleKey.split('.')[2]];
        }
        const check =
          queryFilters.includes(restToValidate[0]) ||
          restToValidate.length == 0;
        if (!check) {
          switch (restToValidate[0]) {
            case 'includes':
            case 'include':
              ruleKey = ruleKey.replace(restToValidate[0], 'contains');
              break;
            case 'equal':
            case 'equalTo':
              ruleKey = ruleKey.replace(restToValidate[0], 'equals');
              break;

            default:
              throw new BadRequestException(
                WHERE_PIPE_FORMAT.replace('$key', restToValidate[0]).replace(
                  '$query',
                  ruleKey,
                ),
              );
          }
        }
        items[ruleKey] = convertTo(ruleValue!, valueType);
      });
      return object(items) as Record<string, any>;
    } catch (error) {
      throw new BadRequestException(error?.message);
    }
  }
}

function convertTo(value: string, type: PrimitiveType) {
  switch (type) {
    case 'boolean':
      return value == 'true';
    case 'float':
      return parseFloat(value);
    case 'number':
      return parseInt(value);
    case 'string':
      return value;
  }
}
