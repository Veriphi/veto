module.exports = (plop) => {
  const componentTemplatesPath = `generators/NewComponent`

  // Component Generator
  plop.setGenerator('New Component', {
    description: 'Generate boilerplate for a new component.',
    prompts: [
      {
        type: 'list',
        name: 'type',
        message: 'Are you building an Atom or a Molecule?',
        default: 'none',
        choices: [
          { name: 'Atom', value: 'atoms' },
          { name: 'Molecule', value: 'molecules' },
        ],
      },
      {
        type: 'input',
        name: 'name',
        message: 'What is the component name? (UpperCamelCase)',
        validate: (value) =>
          /^[A-Z]*([A-Z][a-z]*)*$/.test(value) ? true : 'Invalid format. Must be UpperCamelCase (letters only)',
      },
    ],
    actions: (data) => {
      const creationPath = `components/{{type}}/{{properCase name}}/{{properCase name}}`
      const indexCreationPath = `components/{{type}}/{{properCase name}}`

      const actions = [
        {
          type: 'add',
          path: `${indexCreationPath}/index.ts`,
          templateFile: `${componentTemplatesPath}/IndexFile.tpl`,
          abortOnFail: true,
        },
        {
          type: 'add',
          path: `${creationPath}.tsx`,
          templateFile: `${componentTemplatesPath}/Component.tpl`,
          abortOnFail: true,
        },
        {
          type: 'add',
          path: `${creationPath}.test.tsx`,
          templateFile: `${componentTemplatesPath}/SpecFile.tpl`,
          abortOnFail: true,
        },
        {
          type: 'add',
          path: `${creationPath}.stories.tsx`,
          templateFile: `${componentTemplatesPath}/Story.tpl`,
          abortOnFail: true,
        },
      ]
      return actions
    },
  })
}
