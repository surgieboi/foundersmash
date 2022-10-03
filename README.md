# FounderSmash

![FounderSmash](public/og.jpg)

FounderSmash is a voting application that allows users to vote on whether they would `pass` or `smash` on Silicon Valley's top founders.

What does it mean to `pass` or `smash`? Find out on (Urban Dictionary)[https://www.urbandictionary.com/define.php?term=Smash%20or%20pass].

## Getting Started

If you would like to clone or fork this respository, follow thses steps to run the application locally:

1. Setup [Supabase](https://supabase.com/), [view instructions](#setting-up-supabase)
2. `git clone ...` 
3. `npm install`
4. `npm run dev`
5. View the application on `localhost:3000`

## Setting up Supabase

This application uses Supabase to store and create views of the following:

### Founders

Create a `founders` table by adding the following attributes:

| Column        | Type           | Primary  | Is Nullable  |
| ------------- |-------------| -----| -----|
| name      | text | false | false |
| company      | text | false | false |
| image      | text | false | false |
| founder_id      | numeric | false | false |

Note, we will use `founder_id` to later join this table to the `votes` table.

### Votes

Create a `votes` table by adding the following attributes:

| Column        | Type           | Primary  | Is Nullable  |
| ------------- |-------------| -----| -----|
| vote      | text | false | false |
| founder      | numeric | false | false |

Using the `founder` attribute, join this table to the `founders` table by using a `foreign key relation`. 

### Voters

Note, we are not storing any sensative consumer data in our `voters` table; however, using [UUID](https://www.npmjs.com/package/uuid) we use this table to track unique voters.

To-do so, create a `votes` table by adding the following attributes:

| Column        | Type           | Primary  | Is Nullable  |
| ------------- |-------------| -----| -----|
| id      | text | true | false |

Note, delete the default `id` and replace it using the new attribute and key defined above.

### Viewing Voting Results by Founder

In order to visualize voting results by founder, create a `VIEW` in Supabase using the following SQL statement:

```
create view rankings as
select
        founders.name,
        founders.company,
        founders.image,
        sum(case when vote = 'smash' then 1 else 0 end) as smashes,
        sum(case when vote = 'pass' then 1 else 0 end) as passes
from votes
left join founders on votes.founder = founders.founder_id
group by founders.id
order by smashes desc 
```

### Updating Environment Variables

Using your Supabase accounts `Database URL` and `ANON Key`, update the following:

1. Update `.env.sample` to `.env`
2. Update each environment variable with their respective values
3. Save

## Deploying to Vercel

By default, this application runs on [Vercel](https://vercel.com/) and can be deployed via your local machine using [Vercel's CLI](https://vercel.com/docs/cli).

Once installed, run `vercel` in terminal and within your applications directory.

## Additional Dependencies

- [Hero Icons](https://heroicons.com/)
- [Tailwind CSS](https://tailwindui.com/)

## Contributing

Feel free to fork this repository and submit pull requests, or build an application of your own. 

## Questions

If you have any questions, feel free to email me at: [sergio.m.villasenor@gmail.com](mailto:sergio.m.villasenor@gmail.com).