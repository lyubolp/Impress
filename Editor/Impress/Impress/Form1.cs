using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using CefSharp;
using CefSharp.WinForms;
using System.IO;
using System.Threading;
using System.Drawing.Text;

namespace Impress
{
    public partial class Form1 : Form
    {
        public ChromiumWebBrowser chromeBrowser;


        class BridgeClass
        {

            // Declare a local instance of chromium and the main form in order to execute things from here in the main thread
            private static ChromiumWebBrowser _instanceBrowser = null;
            // The form class needs to be changed according to yours
            private static Form1 _instanceMainForm = null;


            public BridgeClass(ChromiumWebBrowser originalBrowser, Form1 mainForm)
            {
                _instanceBrowser = originalBrowser;
                _instanceMainForm = mainForm;
            }

            public void saveImpress(object[] saveData)
            {


                SaveFileDialog saveFileDia = new SaveFileDialog();
                saveFileDia.Filter = "Impress presentation files|*.imf";
                
                var thread = new Thread(new ParameterizedThreadStart(param => { saveFileDia.ShowDialog(); }));
                thread.SetApartmentState(ApartmentState.STA);
                thread.Start();
                thread.Join();

                string filePath = saveFileDia.FileName;
                StreamWriter fileWriter = new StreamWriter(filePath);

                fileWriter.AutoFlush = true;
                int i = 0;
                foreach (object item in saveData)
                {
                    
                    fileWriter.WriteLine(item.ToString());
                    System.Diagnostics.Debug.WriteLine(i.ToString() + " " + item.ToString());
                    i++;
                }

                MessageBox.Show("File saved");
            }

        }

        void getFonts()
        {
            using (InstalledFontCollection fontsCollection = new InstalledFontCollection())
            {
                StreamWriter fontListCreator = new StreamWriter(System.IO.Directory.GetCurrentDirectory() + "/fontsList.txt");
                FontFamily[] fontFamilies = fontsCollection.Families;

                fontListCreator.AutoFlush = true;
                foreach (FontFamily font in fontFamilies)
                {
                    fontListCreator.WriteLine(font.Name);    
                }
            }
        }

        public Form1()
        {
            InitializeComponent();
            // Start the browser after initialize global component
            InitializeChromium();

            chromeBrowser.RegisterJsObject("cefCustomObject", new BridgeClass(chromeBrowser, this));
        }

        private void Form1_Load(object sender, EventArgs e)
        {
            getFonts();
        }
        protected override bool ProcessCmdKey(ref Message msg, Keys keyData)
        {
            bool bHandled = false;
            switch (keyData)
            {
                case Keys.F5:
                    chromeBrowser.Refresh();
                    break;
                case Keys.F12:
                    chromeBrowser.ShowDevTools();
                    break;
            }
            return bHandled;
        } //F5 refresh
        public void InitializeChromium()
        {
            CefSettings settings = new CefSettings();

            // Note that if you get an error or a white screen, you may be doing something wrong !
            // Try to load a local file that you're sure that exists and give the complete path instead to test
            // for example, replace page with a direct path instead :
            // String page = @"C:\Users\SDkCarlos\Desktop\afolder\index.html";

            //String page = string.Format(@"{0}\html-resources\html\index.html", Application.StartupPath);
            String page = @"E:\Impress\Impress\HTML%20Core\index.html";


            // Initialize cef with the provided settings
            Cef.Initialize(settings);
            // Create a browser component
            chromeBrowser = new ChromiumWebBrowser(page);

            // Add it to the form and fill it to the form window.
            this.panel2.Controls.Add(chromeBrowser);
            chromeBrowser.Dock = DockStyle.Fill;

            // Allow the use of local resources in the browser
            BrowserSettings browserSettings = new BrowserSettings();
            browserSettings.FileAccessFromFileUrls = CefState.Enabled;
            browserSettings.UniversalAccessFromFileUrls = CefState.Enabled;
            chromeBrowser.BrowserSettings = browserSettings;

        }

        private void Form1_FormClosing(object sender, FormClosingEventArgs e)
        {
            Cef.Shutdown();
        }

        private void btnRefresh_Click(object sender, EventArgs e)
        {
            chromeBrowser.Refresh();
        }

        private void btnDevTools_Click(object sender, EventArgs e)
        {
            chromeBrowser.ShowDevTools();
        }
    }
}
