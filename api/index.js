export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('请使用 POST 方式访问');
  
  const { news } = req.body;
  try {
    const response = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.DEEPSEEK_KEY}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [{ role: 'system', content: '优雅助理简报' }, { role: 'user', content: news }]
      })
    });
    const data = await response.json();
    res.status(200).json({ result: data.choices[0].message.content });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
    res.status(200).json({ result: data.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
