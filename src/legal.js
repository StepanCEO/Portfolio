// Юридические документы сайта: политика обработки персональных данных и отдельное
// согласие (с 01.09.2025 согласие по 152-ФЗ оформляется отдельным документом).
// Пишем только то, что правда: где данные хранятся и куда передаются, — как есть.
// Блок раздела: строка — абзац, { list: [...] } — список.

export const legal = {
  ru: {
    privacy: {
      title: 'Политика обработки персональных данных',
      updated: 'Редакция от 29 октября 2026 года',
      sections: [
        [
          '1. Общие положения',
          [
            'Политика определяет порядок обработки и меры защиты персональных данных посетителей сайта https://itssteps.site (далее — Сайт) в соответствии с Федеральным законом от 27.07.2006 № 152-ФЗ «О персональных данных».',
            'Оператор персональных данных — Степан, физическое лицо, применяющее специальный налоговый режим «Налог на профессиональный доход» (самозанятый) (далее — Оператор). Связь с Оператором: Telegram @SStepCEO.',
            'Политика действует в отношении всех персональных данных, которые Оператор получает через Сайт, и опубликована в открытом доступе на этой странице.',
          ],
        ],
        [
          '2. Какие данные, зачем и на каком основании',
          [
            'Обработка заявок и обращений, обсуждение, подготовка и заключение договора на оказание услуг:',
            {
              list: [
                'данные: имя, контактные данные (телефон, адрес электронной почты или аккаунт Telegram), название компании, сведения из текста обращения;',
                'основание: согласие субъекта персональных данных (п. 1 ч. 1 ст. 6 152-ФЗ), при заключении договора — п. 5 ч. 1 ст. 6 152-ФЗ;',
                'срок: до достижения цели обработки, но не более 3 лет с момента получения данных, либо до отзыва согласия.',
              ],
            },
            'Участие в партнёрской программе: те же категории данных, основание и срок.',
            'Статистика посещаемости и улучшение Сайта — только при согласии на использование cookie:',
            {
              list: [
                'данные: файлы cookie, IP-адрес, сведения о браузере и устройстве, источник перехода, действия на страницах Сайта;',
                'обработку выполняет сервис Яндекс Метрика (ООО «ЯНДЕКС»), в том числе инструмент «Вебвизор»;',
                'основание: согласие, которое посетитель даёт в уведомлении о cookie.',
              ],
            },
            'Оператор не обрабатывает специальные категории персональных данных и биометрические персональные данные.',
          ],
        ],
        [
          '3. Условия и порядок обработки',
          [
            'С персональными данными совершаются действия: сбор, запись, систематизация, накопление, хранение, уточнение (обновление, изменение), извлечение, использование, передача (предоставление, доступ), блокирование, удаление, уничтожение.',
            'Обработка — автоматизированная и смешанная. Оператор не принимает решений, порождающих юридические последствия для субъекта, исключительно на основе автоматизированной обработки.',
            'Заявки, отправленные через форму, записываются и хранятся на сервере Сайта и доступны только Оператору.',
          ],
        ],
        [
          '4. Передача третьим лицам',
          [
            {
              list: [
                'ООО «ЯНДЕКС» — сервис Яндекс Метрика, только при согласии на использование cookie;',
                'мессенджер Telegram — уведомление Оператору о новой заявке с указанными в ней данными. Это трансграничная передача персональных данных, она выполняется только с согласия субъекта.',
              ],
            },
            'Иным лицам персональные данные не передаются и не продаются, за исключением случаев, предусмотренных законодательством Российской Федерации.',
          ],
        ],
        [
          '5. Файлы cookie',
          [
            'При первом посещении Сайт показывает уведомление о cookie. Яндекс Метрика включается, только если посетитель нажал «Принять». Выбор можно изменить в любой момент по ссылке «Настройки cookie» внизу страницы или удалив cookie в настройках браузера.',
          ],
        ],
        [
          '6. Права субъекта персональных данных',
          [
            'Субъект персональных данных вправе:',
            {
              list: [
                'получить сведения об обработке своих персональных данных (ст. 14 152-ФЗ);',
                'требовать уточнения, блокирования или уничтожения данных, если они неполные, устаревшие, неточные, незаконно полученные или не нужны для заявленной цели;',
                'отозвать согласие на обработку персональных данных (ч. 2 ст. 9 152-ФЗ);',
                'обжаловать действия Оператора в Роскомнадзоре или в суде.',
              ],
            },
            'Запрос или отзыв согласия направляется Оператору в Telegram @SStepCEO. Оператор отвечает на запрос в течение 10 рабочих дней; срок может быть продлён не более чем на 5 рабочих дней с уведомлением о причинах. После отзыва согласия Оператор прекращает обработку и уничтожает данные в срок не более 30 дней, если иное не предусмотрено законом.',
          ],
        ],
        [
          '7. Меры защиты',
          [
            {
              list: [
                'данные передаются на Сайт только по защищённому соединению HTTPS;',
                'доступ к серверу — только у Оператора и только по криптографическому ключу;',
                'сервис приёма заявок работает от отдельного системного пользователя с минимальными правами, файл с заявками доступен только ему;',
                'форма защищена от автоматических отправок.',
              ],
            },
          ],
        ],
        [
          '8. Заключительные положения',
          [
            'Оператор вправе вносить изменения в Политику. Новая редакция действует с момента публикации на этой странице. По всем вопросам обработки персональных данных — Telegram @SStepCEO.',
          ],
        ],
      ],
    },

    consent: {
      title: 'Согласие на обработку персональных данных',
      updated: 'Редакция от 29 октября 2026 года',
      sections: [
        [
          'Кто и кому даёт согласие',
          [
            'Отмечая поле согласия и отправляя форму на сайте https://itssteps.site, я свободно, своей волей и в своём интересе даю согласие Степану — физическому лицу, применяющему налоговый режим «Налог на профессиональный доход» (далее — Оператор), на обработку моих персональных данных на условиях ниже.',
          ],
        ],
        [
          'Какие данные',
          [
            'Имя, контактные данные (телефон, адрес электронной почты, аккаунт Telegram), название компании и сведения, которые я указал в тексте обращения.',
          ],
        ],
        [
          'Цели',
          [
            {
              list: [
                'рассмотрение моего обращения и ответ на него;',
                'обсуждение, подготовка и заключение договора на оказание услуг;',
                'участие в партнёрской программе, если я отправляю заявку партнёра.',
              ],
            },
          ],
        ],
        [
          'Действия с данными',
          [
            'Сбор, запись, систематизация, накопление, хранение, уточнение (обновление, изменение), извлечение, использование, передача (предоставление, доступ), блокирование, удаление, уничтожение — с использованием средств автоматизации и без них.',
          ],
        ],
        [
          'Трансграничная передача',
          ['Я согласен на передачу указанных данных в мессенджер Telegram для уведомления Оператора о моём обращении.'],
        ],
        [
          'Срок и отзыв',
          [
            'Согласие действует до достижения целей обработки, но не более 3 лет с момента его получения. Я могу отозвать согласие в любой момент, направив заявление Оператору в Telegram @SStepCEO. После отзыва Оператор прекращает обработку и уничтожает данные в срок не более 30 дней, если иное не предусмотрено законом.',
            'Я подтверждаю, что ознакомлен с Политикой обработки персональных данных, размещённой на сайте.',
          ],
        ],
      ],
    },
  },

  en: {
    privacy: {
      title: 'Personal data processing policy',
      updated: 'Version of October 29, 2026. This is a translation; the Russian version prevails.',
      sections: [
        [
          '1. General provisions',
          [
            'This policy sets out how personal data of visitors to https://itssteps.site (the Site) is processed and protected under Russian Federal Law No. 152-FZ “On Personal Data” of July 27, 2006.',
            'The data operator is Stepan, an individual registered as self-employed in Russia (professional income tax regime) (the Operator). Contact: Telegram @SStepCEO.',
            'The policy covers all personal data the Operator receives through the Site and is publicly available on this page.',
          ],
        ],
        [
          '2. What data, why and on what basis',
          [
            'Handling requests, discussing, preparing and signing a service contract:',
            {
              list: [
                'data: name, contact details (phone, email or Telegram account), company name, information from the request text;',
                'basis: consent of the data subject (Art. 6(1)(1) of 152-FZ); when a contract is signed — Art. 6(1)(5);',
                'period: until the purpose is achieved, but no longer than 3 years from receipt, or until consent is withdrawn.',
              ],
            },
            'Partner program: the same data, basis and period.',
            'Visit statistics and site improvement — only if you accept cookies:',
            {
              list: [
                'data: cookies, IP address, browser and device information, referral source, actions on the Site’s pages;',
                'processed by Yandex Metrica (Yandex LLC), including its Webvisor session replay;',
                'basis: consent given in the cookie notice.',
              ],
            },
            'The Operator does not process special categories of personal data or biometric data.',
          ],
        ],
        [
          '3. How data is processed',
          [
            'Actions performed: collection, recording, systematisation, accumulation, storage, clarification (updating, changing), retrieval, use, transfer (provision, access), blocking, deletion, destruction.',
            'Processing is automated and mixed. The Operator makes no decisions with legal effects for the data subject based solely on automated processing.',
            'Requests sent through the form are recorded and stored on the Site’s server and are accessible only to the Operator.',
          ],
        ],
        [
          '4. Transfer to third parties',
          [
            {
              list: [
                'Yandex LLC — Yandex Metrica, only if you accept cookies;',
                'Telegram messenger — a notification to the Operator about a new request with the data in it. This is a cross-border transfer of personal data and happens only with the data subject’s consent.',
              ],
            },
            'Personal data is not shared with or sold to anyone else, except as required by Russian law.',
          ],
        ],
        [
          '5. Cookies',
          [
            'On the first visit the Site shows a cookie notice. Yandex Metrica is enabled only if you click “Accept”. You can change your choice at any time via “Cookie settings” at the bottom of the page or by deleting cookies in your browser.',
          ],
        ],
        [
          '6. Your rights',
          [
            'You have the right to:',
            {
              list: [
                'receive information about the processing of your personal data (Art. 14 of 152-FZ);',
                'demand that your data be clarified, blocked or destroyed if it is incomplete, outdated, inaccurate, unlawfully obtained or not needed for the stated purpose;',
                'withdraw your consent (Art. 9(2) of 152-FZ);',
                'appeal the Operator’s actions to Roskomnadzor or in court.',
              ],
            },
            'Send requests or consent withdrawal to Telegram @SStepCEO. The Operator replies within 10 business days; this may be extended by up to 5 business days with an explanation. After consent is withdrawn, the Operator stops processing and destroys the data within 30 days unless the law requires otherwise.',
          ],
        ],
        [
          '7. Security measures',
          [
            {
              list: [
                'data is sent to the Site only over an encrypted HTTPS connection;',
                'only the Operator has access to the server, and only with a cryptographic key;',
                'the request service runs as a separate system user with minimal rights, and only it can read the requests file;',
                'the form is protected against automated submissions.',
              ],
            },
          ],
        ],
        [
          '8. Final provisions',
          [
            'The Operator may update this policy. A new version takes effect when published on this page. For any data questions — Telegram @SStepCEO.',
          ],
        ],
      ],
    },

    consent: {
      title: 'Consent to personal data processing',
      updated: 'Version of October 29, 2026. This is a translation; the Russian version prevails.',
      sections: [
        [
          'Who gives consent and to whom',
          [
            'By ticking the consent box and submitting a form on https://itssteps.site, I freely, of my own will and in my own interest, consent to Stepan — an individual registered as self-employed in Russia (the Operator) — processing my personal data on the terms below.',
          ],
        ],
        [
          'What data',
          ['Name, contact details (phone, email, Telegram account), company name and the information I included in my request.'],
        ],
        [
          'Purposes',
          [
            {
              list: [
                'reviewing and replying to my request;',
                'discussing, preparing and signing a service contract;',
                'taking part in the partner program if I send a partner request.',
              ],
            },
          ],
        ],
        [
          'Actions with the data',
          [
            'Collection, recording, systematisation, accumulation, storage, clarification (updating, changing), retrieval, use, transfer (provision, access), blocking, deletion, destruction — with or without automation.',
          ],
        ],
        [
          'Cross-border transfer',
          ['I consent to this data being sent to the Telegram messenger to notify the Operator about my request.'],
        ],
        [
          'Period and withdrawal',
          [
            'This consent is valid until the purposes are achieved, but no longer than 3 years from when it was given. I can withdraw it at any time by messaging the Operator on Telegram @SStepCEO. After withdrawal the Operator stops processing and destroys the data within 30 days unless the law requires otherwise.',
            'I confirm that I have read the Personal data processing policy published on the Site.',
          ],
        ],
      ],
    },
  },
}
