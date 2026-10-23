# Day 16: Complex Forms & Validation (Exercise 1)

This project implements an enterprise-grade, multi-step "Create Project" form. It demonstrates advanced form handling techniques in Next.js using uncontrolled components for high performance, strict schema validation, and dynamic field arrays.

## 🚀 Tech Stack
* **Framework:** Next.js (App Router)
* **Form State:** React Hook Form
* **Validation:** Zod & `@hookform/resolvers`
* **Styling:** Tailwind CSS
* **UI Components:** shadcn/ui (Button, Input, Label)

## ✨ Core Features
* **Multi-Step Architecture:** A three-step wizard (Basic Info -> Tower Configuration -> Review) managed within a single `useForm` instance to preserve state without complex global stores.
* **Client-Side Validation:** Zod schemas dictate strict rules (e.g., minimum string lengths, minimum array lengths) validated at each step via `.trigger()` before allowing the user to proceed.
* **Dynamic Field Arrays:** Implementation of `useFieldArray` to dynamically add, remove, and validate an unpredictable number of tower configuration blocks.
* **SSR Safety:** Uses `next/dynamic` with `ssr: false` to prevent server-side rendering crashes caused by browser-native APIs (like `crypto.randomUUID()`) inside the form logic.

## 📁 Project Structure
```text
day16_complex_forms/
├── src/
│   ├── app/
│   │   ├── page.tsx                          # Root directory / dynamic routing
│   │   └── exercise-1/
│   │       ├── page.tsx                      # Exercise 1 Entry Point
│   │       ├── schema.ts                     # Zod Single Source of Truth
│   │       └── create-project-form.tsx       # Client-side form logic & UI
│   └── components/
│       └── ui/                               # shadcn/ui primitives
🛠️ Installation & Setup
Install Dependencies

Bash
npm install
(Note: If you encounter peer dependency conflicts with @hookform/resolvers, append --legacy-peer-deps to the install command).

Run the Development Server

Bash
npm run dev
View the Application
Open http://localhost:3000 or navigate directly to http://localhost:3000/exercise-1 in your browser.

🧪 Testing the Implementation
Validation: Attempt to click "Next Step" on Step 1 without filling out the fields. Zod error messages should appear beneath the inputs.

Dynamic Arrays: On Step 2, use the "+ Add Another Tower" button to generate new fields. Remove them using the "X" button.

Payload Submission: On Step 3, click "Submit Project" and open the browser console (F12) to view the final, structured JSON payload ready for backend processing.